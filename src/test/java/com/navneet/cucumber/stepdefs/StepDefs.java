package com.navneet.cucumber.stepdefs;

import com.navneet.TestreactApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = TestreactApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
