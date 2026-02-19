package com.tuempresa.helpdesk.dto.auth;

import com.tuempresa.helpdesk.model.Profile;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CreateUserRequest {
  @NotBlank
  @Email
  private String email;

  @NotBlank
  @Size(max = 120)
  private String fullName;

  @NotBlank
  @Size(min = 6, max = 120)
  private String password;

  private Profile.Role role = Profile.Role.USER;
}
