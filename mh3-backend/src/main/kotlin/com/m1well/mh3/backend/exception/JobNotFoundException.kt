package com.m1well.mh3.backend.exception

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus

@ResponseStatus(HttpStatus.NOT_FOUND)
class JobNotFoundException(message: String) : Exception(message)
