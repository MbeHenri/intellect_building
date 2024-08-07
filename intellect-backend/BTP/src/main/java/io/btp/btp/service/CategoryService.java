package io.btp.btp.service;

import io.btp.btp.domain.Category;
import io.btp.btp.domain.Publication;
import io.btp.btp.model.CategoryDTO;
import io.btp.btp.repos.CategoryRepository;
import io.btp.btp.repos.PublicationRepository;
import io.btp.btp.util.exception.NotFoundException;
import jakarta.transaction.Transactional;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
@Transactional
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final PublicationRepository publicationRepository;

    public CategoryService(final CategoryRepository categoryRepository,
            final PublicationRepository publicationRepository) {
        this.categoryRepository = categoryRepository;
        this.publicationRepository = publicationRepository;
    }

    public List<CategoryDTO> findAll() {
        final List<Category> categories = categoryRepository.findAll(Sort.by("id"));
        return categories.stream()
                .map(category -> mapToDTO(category, new CategoryDTO()))
                .toList();
    }

    public CategoryDTO get(final Long id) {
        return categoryRepository.findById(id)
                .map(category -> mapToDTO(category, new CategoryDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public Long create(final CategoryDTO categoryDTO) {
        final Category category = new Category();
        mapToEntity(categoryDTO, category);
        return categoryRepository.save(category).getId();
    }

    public void update(final Long id, final CategoryDTO categoryDTO) {
        final Category category = categoryRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(categoryDTO, category);
        categoryRepository.save(category);
    }

    public void delete(final Long id) {
        categoryRepository.deleteById(id);
    }

    private CategoryDTO mapToDTO(final Category category, final CategoryDTO categoryDTO) {
        categoryDTO.setId(category.getId());
        categoryDTO.setLabel(category.getLabel());
        categoryDTO.setDescription(category.getDescription());
        categoryDTO.setPublications(category.getPublications().stream()
                .map(publication -> publication.getId())
                .toList());
        return categoryDTO;
    }

    private Category mapToEntity(final CategoryDTO categoryDTO, final Category category) {
        category.setLabel(categoryDTO.getLabel());
        category.setDescription(categoryDTO.getDescription());
        final List<Publication> publications = publicationRepository.findAllById(
                categoryDTO.getPublications() == null ? Collections.emptyList() : categoryDTO.getPublications());
        if (publications.size() != (categoryDTO.getPublications() == null ? 0 : categoryDTO.getPublications().size())) {
            throw new NotFoundException("one of publications not found");
        }
        category.setPublications(new HashSet<>(publications));
        return category;
    }

}
