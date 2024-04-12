using MediatR;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Activities;

public class Delete
{
    public class Command : IRequest
    {
        public Guid Id { get; set; }
    }

    public class Handler : IRequestHandler<Command>
    {
        private readonly DataContext _dataContext;
        private readonly ILogger<Delete> _logger;

        public Handler(DataContext dataContext, ILogger<Delete> logger)
        {
            _dataContext = dataContext;
            _logger = logger;
        }
        
        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await _dataContext.Activities.FindAsync(request.Id);
            
            if (activity == null)
            {
                throw new Exception("Activity not found");
            }

            _dataContext.Remove(activity);
            await _dataContext.SaveChangesAsync();
        }
    }
}