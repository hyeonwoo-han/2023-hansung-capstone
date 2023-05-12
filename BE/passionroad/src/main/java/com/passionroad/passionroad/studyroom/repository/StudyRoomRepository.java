package com.passionroad.passionroad.studyroom.repository;

import com.passionroad.passionroad.studyroom.entity.StudyRoom;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;


import java.util.List;
import java.util.Optional;


public interface StudyRoomRepository extends JpaRepository<StudyRoom, Long>, JpaSpecificationExecutor<StudyRoom> {

    Optional<StudyRoom> findByroomId(String roomId);

    StudyRoom findByTitle(String title);

//    Room findByTitleContains(String title);

    StudyRoom findByRoomId(String roomId);

    Page<StudyRoom> findAllByOrderByCreatedAtDesc(Pageable pageable);

    Page<StudyRoom> findAllByTitleContainingIgnoreCaseOrderByCreatedAtDesc(Pageable pageable, String title);

    Page<StudyRoom> findAllByTag1AndTag2AndTag3OrderByCreatedAtDesc(Pageable pageable, String tag1, String tag2, String tag3);

    List<StudyRoom> findTop8ByOrderByCreatedAtDesc();

    List<StudyRoom> findAllByOrderByCreatedAtDesc();
}
