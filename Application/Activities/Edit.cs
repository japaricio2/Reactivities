using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {

        public class Command : IRequest
        {
            public Activity Activity {get; set;}

            public class Handler : IRequestHandler<Command>
            {
                private readonly IMapper _mapper;
                
                private readonly DataContext _context;
                public Handler(DataContext context, IMapper mapper)
                {
            _mapper = mapper;
                    _context = context;
                }

                public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
                {
                    var activity = await _context.Activities.FindAsync(request.Activity.Id);

                    // the classic way to update a field
                    // activity.Title = request.Activity.Title ?? activity.Title;

                    //new way to update object with automapper
                    // this reads like "we are going to map Activity from activity" big, and little
                    // will map every field now!!
                    _mapper.Map(request.Activity, activity);

                    await _context.SaveChangesAsync();

                    return Unit.Value;

                    

                }
            }

        }
        
    }
}