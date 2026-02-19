package com.tuempresa.helpdesk.dto.auth;

import com.tuempresa.helpdesk.model.UserAccount;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CreateUserRequest {
  @NotBlank
  @Size(max = 80)
  private String username;

  @NotBlank
  @Size(max = 120)
  private String fullName;

  @NotBlank
  @Size(min = 6, max = 120)
  private String password;

  private UserAccount.Role role = UserAccount.Role.USER;
}
