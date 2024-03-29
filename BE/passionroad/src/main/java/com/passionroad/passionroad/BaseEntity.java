package com.passionroad.passionroad;

import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import java.time.LocalDateTime;

@MappedSuperclass   // set columns are used by every entity
@EntityListeners(value = {AuditingEntityListener.class})
@Getter
public class BaseEntity {

    @CreatedDate    // put created date every table
    @Column(name = "regdate", updatable = false)
    private LocalDateTime regDate;

    @LastModifiedDate   // put modified date every table, modify this when column changed
    @Column(name = "moddate")
    private LocalDateTime modDate;

}
