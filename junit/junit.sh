#!/bin/bash
if [ -d "/home/coder/project/workspace/springapp/" ]
then
    echo "project folder present"
    # checking for src folder
    if [ -d "/home/coder/project/workspace/springapp/src/" ]
    then
        cp -r /home/coder/project/workspace/junit/test /home/coder/project/workspace/springapp/src/;
		cd /home/coder/project/workspace/springapp/;
		mvn clean test;
    else
        echo "testGetEventAll FAILED";
        echo "testGetEventById FAILED";
        echo "testGetThemeAll FAILED";
        echo "testGetThemeById FAILED";
        echo "testGetAddOnById FAILED";
        echo "testGetAddOnAll FAILED";
        echo "testGetMenuAll FAILED";
        echo "testGetMenuById FAILED";
        echo "test_case1 FAILED";
        echo "test_case2 FAILED";
    fi
else
	   echo "testGetEventAll FAILED";
        echo "testGetEventById FAILED";
        echo "testGetThemeAll FAILED";
        echo "testGetThemeById FAILED";
        echo "testGetAddOnById FAILED";
        echo "testGetAddOnAll FAILED";
        echo "testGetMenuAll FAILED";
        echo "testGetMenuById FAILED";
        echo "test_case1 FAILED";
        echo "test_case2 FAILED";
fi
