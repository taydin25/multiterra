package customermanagement.entity;

import lombok.Data;

@Data
public class Password {

    private String newPassword;
    private String currentPassword;
    private String confirmPassword;
}
