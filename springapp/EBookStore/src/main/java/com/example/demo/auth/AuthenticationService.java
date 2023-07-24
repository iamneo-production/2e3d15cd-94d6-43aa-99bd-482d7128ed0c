package com.example.demo.auth;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.config.JwtService;
import com.example.demo.models.Cart;
import com.example.demo.models.Library;
import com.example.demo.models.Role;
import com.example.demo.models.User;
import com.example.demo.models.Wishlist;
import com.example.demo.repository.CartRepo;
import com.example.demo.repository.LibraryRepo;
import com.example.demo.repository.UserRepo;
import com.example.demo.repository.WishlistRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
	
	private final UserRepo userrepo;
	private final LibraryRepo librepo;
	private final CartRepo cartrepo;
	private final WishlistRepo wishlistrepo;
	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;
	private final AuthenticationManager authenticationManager;
	
	public ResponseEntity<String> register(RegisterRequest request) {
		boolean userExists =  userrepo.existsByUsername(request.getUsername());
		if(!userExists) {			
			Library lib=new Library();
			librepo.save(lib);
			Cart cart=new Cart();
			cartrepo.save(cart);
			Wishlist wishlist=new Wishlist();
			wishlistrepo.save(wishlist);
			var user=User.builder()
				.firstname(request.getFirstName())
				.lastname(request.getLastName())
				.username(request.getUsername())
				.email(request.getEmail())
				.password(passwordEncoder.encode(request.getPassword()))
				.role(Role.USER)
				.library(lib)
				.cart(cart)
				.wishlist(wishlist)
				.build();
		
			userrepo.save(user);
			return ResponseEntity.ok("User Registered Succesfully");
		}
		else {
			return ResponseEntity.badRequest().body("User Already Exists");
		}
	}

	public AuthenticationResponse authenticate(AuthenticationRequest request) {
		authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
				request.getUsername(),request.getPassword()));
		var user=userrepo.findByUsername(request.getUsername()).orElseThrow();
		var jwtToken=jwtService.generateToken(user);
		UserResponse userresp=new UserResponse(user.getId(),user.getFirstname(),user.getUsername(),user.getEmail());
		return AuthenticationResponse.builder()
				.token(jwtToken)
				.userResponse(userresp)
				.build();
	}

}
