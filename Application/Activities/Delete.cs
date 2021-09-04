using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }

        public class handler : IRequestHandler<Command>
        {
            private readonly DataContext _dataContext;
            public handler(DataContext dataContext)
            {
                this._dataContext = dataContext;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _dataContext.Activities.FindAsync(request.Id);

                _dataContext.Remove(activity);

                await _dataContext.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}