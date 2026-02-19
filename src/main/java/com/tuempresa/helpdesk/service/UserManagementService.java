package com.tuempresa.helpdesk.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tuempresa.helpdesk.dto.auth.CreateUserRequest;
import com.tuempresa.helpdesk.dto.auth.UserDTO;
import com.tuempresa.helpdesk.model.Profile;
import com.tuempresa.helpdesk.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UserManagementService {
  private final ProfileRepository profileRepo;
  private final ObjectMapper mapper = new ObjectMapper();
  private final HttpClient httpClient = HttpClient.newHttpClient();

  @Value("${app.supabase.url}")
  private String supabaseUrl;

  @Value("${app.supabase.service-role-key}")
  private String serviceRoleKey;

  public UserManagementService(ProfileRepository profileRepo) {
    this.profileRepo = profileRepo;
  }

  public UserDTO createUser(CreateUserRequest req) {
    try {
      String payload = mapper.createObjectNode()
          .put("email", req.getEmail().trim().toLowerCase())
          .put("password", req.getPassword())
          .put("email_confirm", true)
          .set("user_metadata", mapper.createObjectNode().put("full_name", req.getFullName().trim()))
          .toString();

      HttpRequest request = HttpRequest.newBuilder()
          .uri(URI.create(supabaseUrl + "/auth/v1/admin/users"))
          .header("apikey", serviceRoleKey)
          .header("Authorization", "Bearer " + serviceRoleKey)
          .header("Content-Type", "application/json")
          .POST(HttpRequest.BodyPublishers.ofString(payload, StandardCharsets.UTF_8))
          .build();

      HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
      if (response.statusCode() < 200 || response.statusCode() >= 300) {
        throw new IllegalArgumentException("Supabase error creando usuario: " + response.body());
      }

      JsonNode body = mapper.readTree(response.body());
      UUID userId = UUID.fromString(body.get("id").asText());

      Profile profile = profileRepo.findById(userId).orElseGet(Profile::new);
      profile.setId(userId);
      profile.setFullName(req.getFullName().trim());
      profile.setRole(req.getRole() == null ? Profile.Role.USER : req.getRole());
      profile.setActive(true);
      if (profile.getCreatedAt() == null) profile.setCreatedAt(OffsetDateTime.now());

      return UserDTO.from(profileRepo.save(profile));
    } catch (IllegalArgumentException ex) {
      throw ex;
    } catch (Exception ex) {
      throw new IllegalArgumentException("No se pudo crear usuario: " + ex.getMessage());
    }
  }

  public List<UserDTO> listUsers() {
    return profileRepo.findAll().stream().map(UserDTO::from).collect(Collectors.toList());
  }
}
