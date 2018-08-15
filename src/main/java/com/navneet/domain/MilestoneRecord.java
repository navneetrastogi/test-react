package com.navneet.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A MilestoneRecord.
 */
@Entity
@Table(name = "milestone_record")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class MilestoneRecord implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "created_on")
    private LocalDate createdOn;

    @Column(name = "notes")
    private String notes;

    @ManyToOne
    @JsonIgnoreProperties("milestoneRecords")
    private StudentProfile studentProfile;

    @ManyToOne
    @JsonIgnoreProperties("milestoneRecords")
    private Milestone milestone;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getCreatedOn() {
        return createdOn;
    }

    public MilestoneRecord createdOn(LocalDate createdOn) {
        this.createdOn = createdOn;
        return this;
    }

    public void setCreatedOn(LocalDate createdOn) {
        this.createdOn = createdOn;
    }

    public String getNotes() {
        return notes;
    }

    public MilestoneRecord notes(String notes) {
        this.notes = notes;
        return this;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public StudentProfile getStudentProfile() {
        return studentProfile;
    }

    public MilestoneRecord studentProfile(StudentProfile studentProfile) {
        this.studentProfile = studentProfile;
        return this;
    }

    public void setStudentProfile(StudentProfile studentProfile) {
        this.studentProfile = studentProfile;
    }

    public Milestone getMilestone() {
        return milestone;
    }

    public MilestoneRecord milestone(Milestone milestone) {
        this.milestone = milestone;
        return this;
    }

    public void setMilestone(Milestone milestone) {
        this.milestone = milestone;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        MilestoneRecord milestoneRecord = (MilestoneRecord) o;
        if (milestoneRecord.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), milestoneRecord.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MilestoneRecord{" +
            "id=" + getId() +
            ", createdOn='" + getCreatedOn() + "'" +
            ", notes='" + getNotes() + "'" +
            "}";
    }
}
