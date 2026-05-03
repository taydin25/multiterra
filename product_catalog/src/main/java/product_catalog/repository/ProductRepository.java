package product_catalog.repository;


import product_catalog.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, String> {

    List<Product> findByCategory(String category);

    List<Product> findByBrandName(String brandName);

    List<Product> findByProductNameContainingIgnoreCase(String productName);

}
