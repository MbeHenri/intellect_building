package io.btp.btp.service;

import io.btp.btp.domain.Cart;
import io.btp.btp.domain.Formation;
import io.btp.btp.domain.User;
import io.btp.btp.model.CartDTO;
import io.btp.btp.repos.CartRepository;
import io.btp.btp.repos.FormationRepository;
import io.btp.btp.repos.UserRepository;
import io.btp.btp.util.exception.NotFoundException;
import jakarta.transaction.Transactional;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
@Transactional
public class CartService {

    private final CartRepository cartRepository;
    private final UserRepository userRepository;
    private final FormationRepository formationRepository;

    public CartService(final CartRepository cartRepository, final UserRepository userRepository,
            final FormationRepository formationRepository) {
        this.cartRepository = cartRepository;
        this.userRepository = userRepository;
        this.formationRepository = formationRepository;
    }

    public List<CartDTO> findAll() {
        final List<Cart> carts = cartRepository.findAll(Sort.by("id"));
        return carts.stream()
                .map(cart -> mapToDTO(cart, new CartDTO()))
                .toList();
    }

    public CartDTO get(final Long id) {
        return cartRepository.findById(id)
                .map(cart -> mapToDTO(cart, new CartDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public Long create(final CartDTO cartDTO) {
        final Cart cart = new Cart();
        mapToEntity(cartDTO, cart);
        return cartRepository.save(cart).getId();
    }

    public void update(final Long id, final CartDTO cartDTO) {
        final Cart cart = cartRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(cartDTO, cart);
        cartRepository.save(cart);
    }

    public void delete(final Long id) {
        cartRepository.deleteById(id);
    }

    private CartDTO mapToDTO(final Cart cart, final CartDTO cartDTO) {
        cartDTO.setId(cart.getId());
        cartDTO.setUser(cart.getUser() == null ? null : cart.getUser().getId());
        cartDTO.setFormations(cart.getFormations().stream()
                .map(formation -> formation.getId())
                .toList());
        return cartDTO;
    }

    private Cart mapToEntity(final CartDTO cartDTO, final Cart cart) {
        final User user = cartDTO.getUser() == null ? null : userRepository.findById(cartDTO.getUser())
                .orElseThrow(() -> new NotFoundException("user not found"));
        cart.setUser(user);
        final List<Formation> formations = formationRepository.findAllById(
                cartDTO.getFormations() == null ? Collections.emptyList() : cartDTO.getFormations());
        if (formations.size() != (cartDTO.getFormations() == null ? 0 : cartDTO.getFormations().size())) {
            throw new NotFoundException("one of formations not found");
        }
        cart.setFormations(new HashSet<>(formations));
        return cart;
    }

}
