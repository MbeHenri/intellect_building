package io.btp.btp.service.storage;

import java.io.IOException;
import java.nio.file.Path;
import java.util.stream.Stream;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface StorageService {
	void init() throws IOException;

	String store(MultipartFile file, StorageType storageType) throws IOException ;

	Stream<Path> loadAll();

	
	Path load(String filename);
	
	Resource loadAsResource(String filename);
	
	void deleteFile(String filename) throws IOException;
	
	void deleteAll();

}
