package org.example.bookingphoto.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ProductShowDTO {
    private Integer productId;
    private String image;
    private Integer packageId;
    private String namePackage;
    private Integer pricePackage;
    private String descriptionPackage;
}
