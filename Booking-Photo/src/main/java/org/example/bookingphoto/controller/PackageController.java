package org.example.bookingphoto.controller;

import org.example.bookingphoto.dto.PackageDTO;
import org.example.bookingphoto.dto.PackageShowDTO;
import org.example.bookingphoto.service.IPackageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
//
import java.util.List;

@RestController
@RequestMapping("/packages")
public class PackageController {
    @Autowired
    private IPackageService packageService;

    @GetMapping("")
    public ResponseEntity<List<PackageShowDTO>> showPackages () {
        List<PackageShowDTO> packageShowDTOList = packageService.showPackages();
        return new ResponseEntity<>(packageShowDTOList, HttpStatus.OK);
    }
    @PostMapping("/create")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<PackageDTO> create (@RequestBody PackageDTO packageDTO, Authentication authentication) {
        PackageDTO saved = packageService.create(packageDTO, authentication);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }
    @PutMapping("/update")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<PackageDTO> update (@RequestParam("packageId") Integer packageId, @RequestBody PackageDTO packageDTO, Authentication authentication) {
        PackageDTO updatePackage = packageService.edit(packageId, packageDTO, authentication);
        return ResponseEntity.status(HttpStatus.OK).body(updatePackage);
    }
    @DeleteMapping("/delete")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> delete (@RequestParam("packageId") Integer packageId, Authentication authentication) throws Exception {
        packageService.delete(packageId, authentication);
        return ResponseEntity.status(HttpStatus.OK).body("Delete successfully");
    }
}
