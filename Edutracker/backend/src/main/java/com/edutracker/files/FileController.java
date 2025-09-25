package com.edutracker.files;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;

@RestController
@RequestMapping("/api/files")
public class FileController {

    @Value("${app.files.dir:uploads}")
    private String baseDir;

    @PostMapping("/upload")
    @PreAuthorize("hasAnyRole('STUDENT','FACULTY','VALIDATOR','SUB_ADMIN','SUPER_ADMIN')")
    public ResponseEntity<String> upload(@RequestParam("file") MultipartFile file) throws IOException {
        Files.createDirectories(Path.of(baseDir));
        String filename = System.currentTimeMillis() + "_" + StringUtils.cleanPath(file.getOriginalFilename());
        Path dest = Path.of(baseDir, filename);
        Files.copy(file.getInputStream(), dest, StandardCopyOption.REPLACE_EXISTING);
        return ResponseEntity.ok(dest.toString());
    }
}
