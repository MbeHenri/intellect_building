package io.btp.btp.util;

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
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

import io.btp.btp.util.exception.StorageEmptyException;
import io.btp.btp.util.exception.StorageException;
import io.btp.btp.util.exception.StorageFileNotFoundException;


public class FileSystemStorage {

	public static String store(MultipartFile file, Path rootLocation, StorageType storageType) throws IOException {
		String fileName = generateUniqueFileName(file.getOriginalFilename());
		Path destinationDirectory = rootLocation.resolve(storageType.getFolder());
		Path destinationFile = destinationDirectory.resolve(fileName);

		try {
			if (file.isEmpty()) {
				throw new StorageEmptyException("Failed to store empty file.");
			}

			Files.createDirectories(destinationDirectory); // Create the subdirectory if it doesn't exist
			Files.copy(file.getInputStream(), destinationFile, StandardCopyOption.REPLACE_EXISTING);

			return destinationFile.toString();
		} catch (NoSuchFileException e) {
			init(rootLocation);
			Files.createDirectories(destinationDirectory);
			Files.copy(file.getInputStream(), destinationFile, StandardCopyOption.REPLACE_EXISTING);

			return destinationFile.toString();
		}
	}

	private static String generateUniqueFileName(String originalFilename) {
		String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmssSSS"));
		String randomUUID = UUID.randomUUID().toString();
		String fileExtension = extractFileExtension(originalFilename);

		return timestamp + "_" + randomUUID + fileExtension;
	}

	private static String extractFileExtension(String filename) {
		int extensionIndex = filename.lastIndexOf(".");
		if (extensionIndex != -1 && extensionIndex < filename.length() - 1) {
			return filename.substring(extensionIndex);
		}
		return "";
	}

	public static Stream<Path> loadAll(Path rootLocation) {
		try {
			return Files.walk(rootLocation, 1).filter(path -> !path.equals(rootLocation))
					.map(rootLocation::relativize);
		} catch (IOException e) {
			throw new StorageException("Failed to read stored files", e);
		}

	}


	public static Path load(String filename, Path rootLocation) {
		return rootLocation.resolve(filename);
	}

	public static Resource loadAsResource(String filename, Path rootLocation) {
		try {
			Path file = load(filename, rootLocation);
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


	public static void deleteAll(Path rootLocation) {
		FileSystemUtils.deleteRecursively(rootLocation.toFile());
	}

	public static void init(Path rootLocation) throws IOException {
		Files.createDirectories(rootLocation);
	}


	public static void deleteFile(String filename) throws IOException {
		Path path = Paths.get(filename);
		Files.delete(path);
	}

	public static byte[] toByte(String  filePath) {
        String audioFilePath = filePath;

        if (audioFilePath == null) {
            return null;
        }

        try {
            Path path = Paths.get(audioFilePath);
            return Files.readAllBytes(path);
        } catch (IOException e) {
            // Handle the exception according to your needs
            e.printStackTrace();
        }

        return null; // Return null if the audio file data couldn't be read
    }
}
