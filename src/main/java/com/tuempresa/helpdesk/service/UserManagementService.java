package com.tuempresa.helpdesk.service;

import com.tuempresa.helpdesk.dto.auth.CreateUserRequest;
import com.tuempresa.helpdesk.dto.auth.UserDTO;
import com.tuempresa.helpdesk.model.UserAccount;
import com.tuempresa.helpdesk.repository.UserAccountRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserManagementService {
  private final UserAccountRepository userRepo;
  private final PasswordEncoder passwordEncoder;

  public UserManagementService(UserAccountRepository userRepo, PasswordEncoder passwordEncoder) {
    this.userRepo = userRepo;
    this.passwordEncoder = passwordEncoder;
  }

  public UserDTO createUser(CreateUserRequest req) {
    if (userRepo.existsByUsernameIgnoreCase(req.getUsername())) {
      throw new IllegalArgumentException("El usuario ya existe");
    }

    UserAccount user = new UserAccount();
    user.setUsername(req.getUsername().trim());
    user.setFullName(req.getFullName().trim());
    user.setPasswordHash(passwordEncoder.encode(req.getPassword()));
    user.setRole(req.getRole() == null ? UserAccount.Role.USER : req.getRole());
    user.setActive(true);

    return UserDTO.from(userRepo.save(user));
  }

  public List<UserDTO> listUsers() {
    return userRepo.findAll().stream().map(UserDTO::from).collect(Collectors.toList());
  }
}
