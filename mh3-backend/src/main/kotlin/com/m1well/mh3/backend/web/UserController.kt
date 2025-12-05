package com.m1well.mh3.backend.web

import com.m1well.mh3.backend.dto.UserSaveRequestDto
import com.m1well.mh3.backend.dto.UserUpdateRequestDto
import com.m1well.mh3.backend.service.UserService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/user")
class UserController(private val service: UserService) {

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    fun createNewUser(@RequestBody dto: UserSaveRequestDto) =
        ResponseEntity.status(201).body(service.createUser(dto))

    @PutMapping("/{uniqueCode}")
    fun updateUser(@PathVariable uniqueCode: String, @RequestBody dto: UserUpdateRequestDto) =
        ResponseEntity.ok(service.updateUser(uniqueCode, dto))

    @GetMapping("/{uniqueCode}")
    fun getUser(@PathVariable uniqueCode: String) = service.getUserForCode(uniqueCode)
}


