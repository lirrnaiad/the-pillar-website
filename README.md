# **The Pillar E-Publication Website**

*Last Updated: October 18, 2025*

## **1\. Project Description**

This project is the official e-publication website for "The Pillar," the student publication of the University of Eastern Philippines. It serves as a centralized and organized hub for all published content, including news, editorials, announcements, and multimedia. The application provides a full Content Management System (CMS) for the editorial staff and a clean, accessible, and searchable interface for readers.

This system is designed to act as the permanent digital archive for the publication, supplementing its primary social media presence on Facebook.

## **2\. Technology Stack**

This is a full-stack web application built with the following technologies:

* **Backend:** Spring Boot (Java)  
* **Frontend:** Thymeleaf, HTML5, CSS3, JavaScript  
* **Database:** PostgreSQL  
* **Build Tool:** Gradle (Groovy)  
* **Deployment (Target):** Cloud Hosting Provider (e.g., Heroku, Railway)

## **3\. Team Members**

| Name | Role |
| :---- | :---- |
| **Sean Ivan M. Fabia** | Backend Developer & Team Lead |
| **Paolo Leandro L. Pinca** | Main Designer / Frontend Developer |
| **Khristher John B. Barrosa** | Frontend Developer |
| **Marljune S. Ordonia** | Frontend Developer & Security |
| **Adielyn P. Quitorio** | Database Administrator |

## **4\. Prerequisites**

Before you begin, ensure you have the following software installed on your local machine:

* **Java Development Kit (JDK)**: Version 17 or later  
* **Gradle**: Version 8 or later (or use the included Gradle Wrapper)  
* **PostgreSQL**: A running local or remote instance  
* **Git**: For version control

## **5\. Local Development Setup**

Follow these steps to get the project running on your local machine.

### **Step 1: Clone the Repository**

Clone this repository to your local machine using your preferred method (HTTPS or SSH).

git clone \<your-repository-url\>  
cd the-pillar-website

### **Step 2: Configure the Database**

1. Ensure your PostgreSQL server is running.  
2. Create a new database for the project. You can use a tool like psql or a GUI like DBeaver or PgAdmin.  
   CREATE DATABASE the\_pillar\_db;

3. It is recommended to create a dedicated user with privileges for this database.

### **Step 3: Configure Application Properties**

The application requires database credentials to connect to your PostgreSQL instance.

1. Navigate to the src/main/resources/ directory.  
2. Create a file named application.properties. **This file is listed in .gitignore and should NOT be committed to the repository.**  
3. Add the following configuration to your application.properties file, replacing the placeholder values with your actual database details:  
   \# PostgreSQL Datasource Configuration  
   spring.datasource.url=jdbc:postgresql://localhost:5432/the\_pillar\_db  
   spring.datasource.username=your\_postgres\_username  
   spring.datasource.password=your\_postgres\_password

   \# JPA/Hibernate Configuration  
   spring.jpa.hibernate.ddl-auto=update  
   spring.jpa.show-sql=true  
   spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

### **Step 4: Build and Run the Application**

1. Open a terminal in the root directory of the project.  
2. Use the Gradle Wrapper (gradlew) to build and run the Spring Boot application. The wrapper will automatically download the correct Gradle version if you don't have it installed.  
   On macOS/Linux:  
   \# This command will compile the code, download dependencies, and start the server.  
   ./gradlew bootRun

   On Windows:  
   \# This command will do the same on Windows Command Prompt or PowerShell.  
   gradlew.bat bootRun

3. Once the application has started successfully, it will be accessible at: **http://localhost:8080**

## **6\. Branching Strategy**

This project follows a Gitflow-inspired branching model:

* main: Represents the production-ready, deployed code. Direct pushes are disabled.  
* develop: The primary development branch. All feature branches are merged into develop. It should always be stable.  
* feature/\<ticket\>-\<desc\>: All new work (features, chores, bugfixes) must be done on a feature branch. Example: feature/TP-005-create-user-entity.

All code must be submitted through a Pull Request and reviewed by at least one other team member before being merged into develop.