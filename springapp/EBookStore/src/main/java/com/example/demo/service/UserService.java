package com.example.demo.service;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

import org.springframework.cloud.client.loadbalancer.LoadBalancerClient;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.demo.models.Bookmark;
import com.example.demo.models.Cart;
import com.example.demo.models.EBook;
import com.example.demo.models.Library;
import com.example.demo.models.Order;
import com.example.demo.models.ReviewReq;
import com.example.demo.models.User;
import com.example.demo.models.Wishlist;
import com.example.demo.repository.CartRepo;
import com.example.demo.repository.EBookRepo;
import com.example.demo.repository.LibraryRepo;
import com.example.demo.repository.OrderRepo;
import com.example.demo.repository.TransactionRepo;
import com.example.demo.repository.UserRepo;
import com.example.demo.repository.WishlistRepo;
import com.example.demo.vo.Review;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class UserService {
	private final UserRepo userrepo;
	private final CartRepo cartrepo;
	private final LibraryRepo librepo;
	private final WishlistRepo wishlistrepo;
	private final EBookRepo bookrepo;
	private final OrderRepo orderrepo;
	private final TransactionRepo transrepo;
	private final LoadBalancerClient loadBalancerClient;
	public Cart getCart(int userid) {
		User user=userrepo.findById(userid).get();
		return user.getCart();
	}
	
	public Cart addToCart(EBook x,int userid) {
		EBook book=bookrepo.findById(x.getId()).get();
		Cart cart=userrepo.findById(userid).get().getCart();
		cart.addBook(book);
		cart.calcTotal();
		return cartrepo.save(cart);
	}
	
	public Cart removeFromCart(int userid,int bookid) {
		EBook book=bookrepo.findById(bookid).get();
		Cart cart=userrepo.findById(userid).get().getCart();
		cart.removeBook(book);
		cart.calcTotal();
		return cartrepo.save(cart);
	}
	
	public Wishlist getWishlist(int userid) {
		User user=userrepo.findById(userid).get();
		return user.getWishlist();
	}
	
	public Wishlist addToWishlist(EBook x,int userid) {
		EBook book=bookrepo.findById(x.getId()).get();
		Wishlist wishlist=userrepo.findById(userid).get().getWishlist();
		wishlist.addBook(book);
		return wishlistrepo.save(wishlist);
		
	}
	public List<Bookmark> getBookmarks(int userid){
		User user=userrepo.findById(userid).get();
		return user.getBookmarks();
	}
	public Wishlist removeFromWishlist(int userid,int bookid) {
		EBook book=bookrepo.findById(bookid).get();
		Wishlist wishlist=userrepo.findById(userid).get().getWishlist();
		wishlist.removeBook(book);
		return wishlistrepo.save(wishlist);
	}
	
	public Library getLibrary(int userid) {
		User user=userrepo.findById(userid).get();
		return user.getLibrary();
	}
	
	public Library addToLibrary(EBook book,int userid) {
		Optional<User> useropt=userrepo.findById(userid);
		User user=useropt.get();
		Library library=user.getLibrary();
		library.addBook(book);
		return librepo.save(library);
	}
	
	
	public Order placeOrder(int userid) {
		System.out.println("Herer");
		Order order=new Order();
		order.setOrderDate(LocalDateTime.now());
		User user=userrepo.findById(userid).get();
		Cart cart=user.getCart();
		order.setBooks(cart.getBooks());
		order.setTotal(cart.getTotal());
		cart.setBooks(Collections.emptyList());
		orderrepo.save(order);
		List<Order> userorders=user.getOrders();
		userorders.add(order);
		user.setOrders(userorders);
		cartrepo.save(cart);
		userrepo.save(user);
		return order;
	}

	public List<EBook> getForYou(int id) {
		List<String> preferences=userrepo.findById(id).get().getPreferences();
		if(preferences==null || preferences.size()==0) {
			return Collections.emptyList();
		}
		List<EBook> books=bookrepo.findAll();
		List<EBook> filter=new LinkedList<>();
		for(EBook i:books) {
			for(String j:i.getGenre()) {
				if(preferences.contains(j)) {
					filter.add(i);
					break;
				}
			}
		}
		return filter;
	}

	public User addBookmark(int id, Bookmark x) {
		User user=userrepo.findById(id).get();
		List<Bookmark> bookmarks=user.getBookmarks();
		bookmarks.add(x);
		user.setBookmarks(bookmarks);
		return userrepo.save(user);
	}

	public User addPreferences(int id, List<String> x) {
		User user=userrepo.findById(id).get();
		List<String> preferences=new LinkedList<>();
		preferences.addAll(x);
		user.setPreferences(x);
		return userrepo.save(user);
	}

	public boolean isBookInCart(int userid, int bookid) {
		Cart cart=userrepo.findById(userid).get().getCart();
		if(cart.containsBook(bookrepo.findById(bookid).get())) {
			return true;
		}
		return false;
	}

	public boolean isBookInWish(int userid, int bookid) {
		Wishlist wish=userrepo.findById(userid).get().getWishlist();
		if(wish.containsBook(bookrepo.findById(bookid).get())){
			return true;
		}
		return false;
	}

	public ResponseEntity<Review> addReview(ReviewReq reviewreq) {
		RestTemplate restTemplate = new RestTemplate();
		String lurl=loadBalancerClient.choose("REVIEW-SERVICE").getUri().toString();
		HttpHeaders headers =new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		HttpEntity<ReviewReq> requestEntity=new HttpEntity<>(reviewreq,headers);
		String serviceUrl = lurl+"/review/postreview"; 
		ResponseEntity<Review> responseEntity=restTemplate.exchange(serviceUrl, HttpMethod.POST, requestEntity, Review.class);
		return responseEntity;
	}
	
	public List<Review> getBookReviews(int bookid){
		RestTemplate restTemplate=new RestTemplate();
		String lurl=loadBalancerClient.choose("REVIEW-SERVICE").getUri().toString();
		String url=lurl+"/review/bookreviews/"+bookid;
		ResponseEntity<Review[]> responseEntity=restTemplate.exchange(url, HttpMethod.GET, null,Review[].class);
		if(responseEntity.getStatusCode().is2xxSuccessful()) {
			return Arrays.asList(responseEntity.getBody());
		}
		else {
			return Collections.emptyList();
		}
	}
	
	public List<Review> getUserReviews(int userid){
		RestTemplate restTemplate=new RestTemplate();
		String lurl=loadBalancerClient.choose("REVIEW-SERVICE").getUri().toString();
		String url=lurl+"/review/userreviews/"+userid;
		ResponseEntity<Review[]> responseEntity=restTemplate.exchange(url, HttpMethod.GET, null,Review[].class);
		if(responseEntity.getStatusCode().is2xxSuccessful()) {
			return Arrays.asList(responseEntity.getBody());
		}
		else {
			return Collections.emptyList();
		}
	}

	public List<Order> getOrders(int userid) {
		User user=userrepo.findById(userid).get();
		return user.getOrders();
	}
	
}
