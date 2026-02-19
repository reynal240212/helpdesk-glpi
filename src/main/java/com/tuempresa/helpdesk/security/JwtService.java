package com.tuempresa.helpdesk.security;

import com.tuempresa.helpdesk.model.UserAccount;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;

@Service
public class JwtService {

  @Value("${app.jwt.secret:VGhpc0lzQVN1cGVyU2VjcmV0S2V5Rm9ySGVscGRlc2tKd3QxMjM0NTY3ODkw}")
  private String jwtSecret;

  @Value("${app.jwt.expiration-ms:86400000}")
  private long expirationMs;

  public String generateToken(UserAccount user) {
    Date now = new Date();
    Date exp = new Date(now.getTime() + expirationMs);

    return Jwts.builder()
        .setSubject(user.getUsername())
        .claim("role", user.getRole().name())
        .claim("fullName", user.getFullName())
        .setIssuedAt(now)
        .setExpiration(exp)
        .signWith(getSigningKey(), SignatureAlgorithm.HS256)
        .compact();
  }

  public Claims extractClaims(String token) {
    return Jwts.parserBuilder()
        .setSigningKey(getSigningKey())
        .build()
        .parseClaimsJws(token)
        .getBody();
  }

  private Key getSigningKey() {
    byte[] keyBytes = Decoders.BASE64.decode(jwtSecret);
    return Keys.hmacShaKeyFor(keyBytes);
  }
}
