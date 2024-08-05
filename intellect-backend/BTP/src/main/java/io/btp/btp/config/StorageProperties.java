package io.btp.btp.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import lombok.Getter;

@Getter
@Configuration
public class StorageProperties {
	/**
	 * Folder location for storing files
	 */
	@Value("${btp.storate.root}")
	private String location;
}
