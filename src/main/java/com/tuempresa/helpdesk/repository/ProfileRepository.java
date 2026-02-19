package com.tuempresa.helpdesk.repository;

import com.tuempresa.helpdesk.model.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ProfileRepository extends JpaRepository<Profile, UUID> {
}
