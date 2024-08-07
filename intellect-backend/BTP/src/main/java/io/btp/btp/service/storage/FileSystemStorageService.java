package io.btp.btp.service.storage;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.NoSuchFileException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;
import java.util.stream.Stream;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

import io.btp.btp.config.StorageProperties;
import io.btp.btp.util.exception.StorageEmptyException;
import io.btp.btp.util.exception.StorageException;
import io.btp.btp.util.exception.StorageFileNotFoundException;

@Service
public class FileSystemStorageService implements StorageService {

	private final Path rootLocation;

	public FileSystemStorageService(StorageProperties properties) {
		this.rootLocation = Paths.get(properties.getLocation());
	}

	@Override
	public String store(MultipartFile file, StorageType storageType) throws IOException {
		String fileName = generateUniqueFileName(file.getOriginalFilename());
		Path destinationDirectory = this.rootLocation.resolve(storageType.getFolder());
		Path destinationFile = destinationDirectory.resolve(fileName);

		try {
			if (file.isEmpty()) {
				throw new StorageEmptyException("Failed to store empty file.");
			}

			Files.createDirectories(destinationDirectory); // Create the subdirectory if it doesn't exist
			Files.copy(file.getInputStream(), destinationFile, StandardCopyOption.REPLACE_EXISTING);

			return destinationFile.toString();
		} catch (NoSuchFileException e) {
			init();
			Files.createDirectories(destinationDirectory);
			Files.copy(file.getInputStream(), destinationFile, StandardCopyOption.REPLACE_EXISTING);

			return destinationFile.toString();
		}
	}

	private String generateUniqueFileName(String originalFilename) {
		String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmssSSS"));
		String randomUUID = UUID.randomUUID().toString();
		String fileExtension = extractFileExtension(originalFilename);

		return timestamp + "_" + randomUUID + fileExtension;
	}

	private String extractFileExtension(String filename) {
		int extensionIndex = filename.lastIndexOf(".");
		if (extensionIndex != -1 && extensionIndex < filename.length() - 1) {
			return filename.substring(extensionIndex);
		}
		return "";
	}

	@Override
	public Stream<Path> loadAll() {
		try {
			return Files.walk(this.rootLocation, 1).filter(path -> !path.equals(this.rootLocation))
					.map(this.rootLocation::relativize);
		} catch (IOException e) {
			throw new StorageException("Failed to read stored files", e);
		}

	}

	@Override
	public Path load(String filename) {
		return rootLocation.resolve(filename);
	}

	@Override
	public Resource loadAsResource(String filename) {
		try {
			Path file = load(filename);
			Resource resource = new UrlResource(file.toUri());
			if (resource.exists() || resource.isReadable()) {
				return resource;
			} else {
				throw new StorageFileNotFoundException("Could not read file: " + filename);

			}
		} catch (MalformedURLException e) {
			throw new StorageFileNotFoundException("Could not read file: " + filename, e);
		}
	}

	@Override
	public void deleteAll() {
		FileSystemUtils.deleteRecursively(rootLocation.toFile());
	}

	@Override
	public void init() throws IOException {
		Files.createDirectories(rootLocation);
	}

	@Override
	public void deleteFile(String filename) throws IOException {
		Path path = Paths.get(filename);
		Files.delete(path);
	}
}
