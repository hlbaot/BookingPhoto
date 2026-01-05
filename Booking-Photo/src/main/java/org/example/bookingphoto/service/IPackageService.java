package org.example.bookingphoto.service;

import org.example.bookingphoto.dto.*;
import org.example.bookingphoto.model.Package;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface IPackageService {
    PackageDTO create (PackageDTO packageDTO, Authentication authentication);

    PackageDTO edit(Integer id, PackageDTO packageDTO, Authentication authentication);

    void delete(Integer id, Authentication authentication) throws Exception;

    List<PackageShowDTO> showPackages();
}
