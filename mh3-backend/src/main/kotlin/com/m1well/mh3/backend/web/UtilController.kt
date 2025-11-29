package com.m1well.mh3.backend.web

import com.m1well.mh3.backend.dto.UtilDto
import com.m1well.mh3.backend.service.UtilService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/util")
class UtilController(private val service: UtilService) {

    @GetMapping()
    fun getInfo(): ResponseEntity<UtilDto> = ResponseEntity.ok(service.provideInfo());

}
