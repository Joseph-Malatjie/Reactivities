﻿using Application.Activities;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class ActivitiesController : BaseApiController
{
    
    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivities() => 
        await Mediator.Send(new List.Query());
    

    [HttpGet("{id}")]
    public async Task<ActionResult<Activity>> GetActivity(Guid id) => 
        await Mediator.Send(new Details.Query {Id = id});

    [HttpPost]
    public async Task<ActionResult> CreateActivity(Activity activity)
    {
        await Mediator.Send(new Create.Command { Activity = activity });
        
        return Ok(); 
    }
    
    [HttpPut("{id}")]
    public async Task<IActionResult> EditActivity(Guid id, Activity activity)
    {
        activity.Id = id;
        await Mediator.Send(new Edit.Command { Activity = activity });
        
        return Ok();
    }
    
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteActivity(Guid id)
    {
        await Mediator.Send(new Delete.Command { Id = id });
        
        return Ok();
    }
        
}