package product_catalog.entities;

import jakarta.persistence.*;
import lombok.*;

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
    @Column(name = "productid")
    private UUID productId;

    @Column(name = "productname")
    private String productName;

    @Column(name = "productcode")
    private String productCode;

    @Column(name = "description")
    private String description;

    @Column(name = "price")
    private Double price;

    @Column(name = "category")
    private String category;

    @Column(name = "brandname")
    private String brandName;

    @Column(name = "attributes", columnDefinition = "jsonb")
    private String attributes;

}