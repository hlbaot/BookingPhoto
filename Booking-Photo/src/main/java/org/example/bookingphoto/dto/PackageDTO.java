package org.example.bookingphoto.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.bookingphoto.model.Image;
import org.example.bookingphoto.model.Package;
import org.springframework.beans.BeanUtils;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PackageDTO {
    private Integer id;
    @NotNull
    @Size(max = 255)
    private String name;
    @NotNull
    private Integer price;
    @NotNull
    @Size(max = 500)
    private String description;
    private List<String> imageUrls;
}
