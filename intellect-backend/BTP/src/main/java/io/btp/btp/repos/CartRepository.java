package io.btp.btp.repos;

import io.btp.btp.domain.Cart;
import io.btp.btp.domain.Formation;
import io.btp.btp.domain.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CartRepository extends JpaRepository<Cart, Long> {

    Cart findFirstByUser(User user);

    Cart findFirstByFormations(Formation formation);

    List<Cart> findAllByFormations(Formation formation);

}
