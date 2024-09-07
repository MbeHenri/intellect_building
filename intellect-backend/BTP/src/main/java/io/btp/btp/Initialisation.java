package io.btp.btp;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import io.btp.btp.model.input.CategoryDTO;
import io.btp.btp.model.input.PrivilegeDTO;
import io.btp.btp.model.input.PrivilegeList;
import io.btp.btp.model.input.ProfileDTO;
import io.btp.btp.model.input.RoleDTO;
import io.btp.btp.model.input.RoleList;
import io.btp.btp.model.input.UserDTO;
import io.btp.btp.service.CategoryService;
import io.btp.btp.service.PrivilegeService;
import io.btp.btp.service.ProfileService;
import io.btp.btp.service.RoleService;
import io.btp.btp.service.UserService;
import io.btp.btp.util.exception.NotFoundException;
import lombok.AllArgsConstructor;


@AllArgsConstructor
@Component
public class Initialisation {
    @Autowired
	private final PrivilegeService privilegeService;
	
	@Autowired
	private final RoleService roleService;
	
	@Autowired
	private final CategoryService categoryService;
	
    @Autowired
    private final UserService userService;

    @Autowired
    private final ProfileService profileService;
	
	
	public void rolesPrivileges() {
		// Check if Privilege table is empty
		if (privilegeService.count() == 0 && roleService.count() == 0) {
			long adminRoleId = roleService.create(new RoleDTO(RoleList.ADMIN.name(), RoleList.ADMIN.getDescription()));
			long userRoleId = roleService.create(new RoleDTO(RoleList.USER.name(), RoleList.USER.getDescription()));
			for (PrivilegeList defaultPrivilege : PrivilegeList.values()) {
				PrivilegeDTO privilege = new PrivilegeDTO(defaultPrivilege.name(), defaultPrivilege.getDescription());
				long privilegeId = privilegeService.create(privilege);
				switch (defaultPrivilege) {
					case PUBLISH: 
                    case COMMENT: 
                    case MAKE_PAYEMENT: 
						roleService.addPrivilegeToRole(userRoleId, privilegeId);
						roleService.addPrivilegeToRole(adminRoleId, privilegeId);
						break;
					case ADD_USER: 
					case DELETE_USER:
					case UPDATE_PRIVILEGE_ROLE:
                    case UPDATE_USER_ROLE:
                    case UPDATE_PROFILE:  
                    case ADD_PRODUCT:
                    case UPDATE_PRODUCT:
                    case DELETE_PRODUCT:   
						roleService.addPrivilegeToRole(adminRoleId, privilegeId);
						break;
					default:
						privilegeService.delete(privilegeId);
						// roleService.delete(adminRoleId);
						// roleService.delete(userRoleId);
						throw new IllegalArgumentException("Unexpected value: " + defaultPrivilege);
				}
		    }
		}
	}
	
	public void addDefaultCategory() {
        try {
            categoryService.findByLabel("uncategorized");
        } catch (NotFoundException e) {
            categoryService.create(new CategoryDTO("uncategorized", "default category"));
        }
	} 

    public void addDefaultAdmin(){
        if(userService.emailExists("admin@gmail.com") == false){
            Long profileId = profileService.create(ProfileDTO.builder().name("admin").build());
            RoleDTO roleDTO = roleService.findByName(RoleList.ADMIN.name());
            userService.create(UserDTO.builder().email("admin@gmail.com").password("password").profile(profileId).role(roleDTO.getId()).build());
        }
    }
}
