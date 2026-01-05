package org.example.bookingphoto.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.bookingphoto.model.Image;

import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PackageShowDTO {
    private Integer id;
    private String name;
    private Integer price;
    private String description;
    private List<String> imageUrls;
}
