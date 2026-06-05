package product_catalog.entities;

import jakarta.persistence.*;
import lombok.*;
import product_catalog.enums.ProductStatus;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "product_info",schema = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id
    @GeneratedValue
    @Column(name = "product_id")
    private UUID productId;

    @Column(name = "productname")
    private String productName;

    @Column(name = "productcode")
    private String productCode;

    @Column(name = "description")
    private String description;

    @Column(name = "price")
    private Double price;

    @Column(name = "currency")
    private String currency;

    @Column(name = "stock_quantity")
    private int stockQuantity;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private ProductStatus status;

    @Column(name = "category")
    private String category;

    @Column(name = "brandname")
    private String brandName;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "attributes", columnDefinition = "jsonb")
    private String attributes;

    @Column(name = "createddate")
    private LocalDateTime createdDate;
    @Column(name = "updateddate")
    private LocalDateTime updatedDate;



}