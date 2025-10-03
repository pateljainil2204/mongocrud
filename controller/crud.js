import Task from "../models/model.js";

const createTask = async ( req, res ) => {
  try{ 
    const data = {
      ...req.body,
      createdBy: req.user.id
    }    
    const task = new Task(data);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
 };

 const getallTask = async ( req, res ) => {
    try{
      const tasks =  await Task.find();
      res.json(tasks);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};

const getTaskbyid = async ( req, res ) => {
    try{
      const task = await Task.findById(req.params.id).populate("createdBy", "-password");
      if(!task) return res.status(404).json({ message: "task not found" });
      res.json(task);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};

const updateTask = async ( req , res ) => {
    try{
       const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
       if (!task) return res.status(404).json({ message: "Task not found" });
       res.json(task);
    } catch ( error ) {
        res.status(400).json({ error: error.message });
    }
  }; 

const deleteTask = async ( req, res ) => {
    try{
        const task = await Task.findByIdAndDelete(req.params.id);   
        if (!task) return res.status(404).json({ message: "Task not found" });
        res.json({ message: "Task deleted successfully" });
    }catch ( error ) {
        res.status(400).json({ error: error.message });
    }
  };

export { createTask, getallTask, getTaskbyid, updateTask, deleteTask };