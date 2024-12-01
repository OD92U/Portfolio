const Project = require('../models/Project');
const fs = require('fs');

exports.createProject = async (req, res, next) => {
  try {
      const { title, description, skills, githubLink, demoLink } = req.body;

      
      if (!title || !description || !githubLink || !demoLink) {
          return res.status(400).json({ error: 'Tous les champs obligatoires doivent être remplis.' });
      }

      
      const validSkills = skills && Array.isArray(skills) && skills.every(skill => typeof skill.skill === 'string');
      if (skills && !validSkills) {
          return res.status(400).json({ error: 'Les compétences doivent être un tableau d\'objets avec une clé "skill".' });
      }

      
      const newProject = new Project({
          title,
          description,
          skills: skills || [],  
          github: githubLink,
          demo: demoLink
      });

      
      await newProject.save();

      
      return res.status(201).json({
          message: 'Projet créé avec succès!',
          project: newProject
      });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erreur du serveur lors de la création du projet.' });
  }
};

  
exports.getAllProjects = async (req, res, next) => {
  try {
      const projects = await Project.find(); 
      return res.status(200).json(projects);
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erreur du serveur lors de la récupération des projets.' });
  }
};