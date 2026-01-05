package org.example.bookingphoto.service.impl;

import org.example.bookingphoto.dto.PackageDTO;
import org.example.bookingphoto.dto.PackageShowDTO;
import org.example.bookingphoto.model.Image;
import org.example.bookingphoto.model.Package;
import org.example.bookingphoto.model.User;
import org.example.bookingphoto.repository.IPackageRepository;
import org.example.bookingphoto.repository.IUserRepository;
import org.example.bookingphoto.repository.ImageRepository;
import org.example.bookingphoto.service.IPackageService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class PackageService implements IPackageService {
    @Autowired
    private IPackageRepository packageRepository;
    @Autowired
    private ImageRepository imageRepository;
    @Autowired
    private IUserRepository userRepository;

    private User getAuthenticatedUser(Authentication authentication) {
        User user = userRepository.findByEmail(authentication.getName());
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
        return user;
    }

    public PackageDTO createAndEdit (Package ipackage, PackageDTO packageDTO, Authentication authentication) {
        User user = getAuthenticatedUser(authentication);
        ipackage.setUser(user);
        ipackage.setName(packageDTO.getName());
        ipackage.setPrice(packageDTO.getPrice());
        ipackage.setDescription(packageDTO.getDescription());

        // Xóa ảnh cũ (nếu edit)
//        if (ipackage.getImages() != null) {
//            ipackage.getImages().clear(); // orphanRemoval sẽ tự xoá ảnh trong DB
//        }
//        else {
//            ipackage.setImages(new ArrayList<>());
//        }
        // Tạo ảnh

        List<Image> images = new ArrayList<>();
        for (String url : packageDTO.getImageUrls()) {
            Image img = new Image();
//            img.setUrl(url);
//            img.setPackageField(savedPackage); // gán package đã save
//            img.setUser(user);
//            images.add(img);
            img.setUrl(url);
            img.setPackageField(ipackage);
            img.setUser(user);
            ipackage.getImages().add(img);
        }
        // Lưu tất cả ảnh
//        imageRepository.saveAll(images);
//        savedPackage.setImages(images);
        Package savedPackage = packageRepository.save(ipackage);

        PackageDTO responseDto = new PackageDTO();
        BeanUtils.copyProperties(ipackage, responseDto);
        responseDto.setImageUrls(
                savedPackage.getImages().stream()
                        .map(Image::getUrl)
                        .toList()
        );
        return responseDto;
    }
    @Override
    public PackageDTO create (PackageDTO packageDTO, Authentication authentication) {
        Package ipackage = new Package();
        return createAndEdit(ipackage, packageDTO, authentication);
    }

    @Override
    public PackageDTO edit(Integer id, PackageDTO packageDTO, Authentication authentication) {
        Optional<Package> optionalPackage = packageRepository.findById(id);
        if (optionalPackage.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Package not found with id " + id);
        }
        Package ipackage = optionalPackage.get();
        return createAndEdit(ipackage, packageDTO, authentication);
    }

    @Override
    public void delete(Integer id, Authentication authentication) {
        User user = userRepository.findByEmail(authentication.getName());
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found with email " + authentication.getName());
        }
        Optional<Package> optionalPackage = packageRepository.findById(id);
        if (optionalPackage.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Package not found with id " + id);
        }
        Package aPackage = optionalPackage.get();

        packageRepository.delete(aPackage);
    }
    @Override
    public List<PackageShowDTO> showPackages() {
        List<Package> packageList = packageRepository.findAll();
        return packageList.stream()
                .map(pkg -> new PackageShowDTO(
                        pkg.getId(),
                        pkg.getName(),
                        pkg.getPrice(),
                        pkg.getDescription(),
                        pkg.getImages().stream()
                            .map(Image::getUrl)
                            .toList()
                ))
                .collect(Collectors.toList());
    }
}
