namespace botwat.ch.Services
{
    public interface IServicesPool
    {
        public IBotClientService BotClientService { get; set; }
        public IExperienceService ExperienceService { get; set; }
        public IInteractionService InteractionService { get; set; }
        public IOldSchoolAccountService OldSchoolAccountService { get; set; }
        public IPermissionService PermissionService { get; set; }
        public ISessionService SessionService { get; set; }
        public IUserService UserService { get; set; }
    }

    public class ServicesPool : IServicesPool
    {
        public ServicesPool(
            IBotClientService botClientService,
            IExperienceService experienceService,
            IInteractionService interactionService,
            IOldSchoolAccountService oldSchoolAccountService,
            IPermissionService permissionService,
            ISessionService sessionService,
            IUserService userService
        )
        {
            BotClientService = botClientService;
            ExperienceService = experienceService;
            InteractionService = interactionService;
            OldSchoolAccountService = oldSchoolAccountService;
            PermissionService = permissionService;
            SessionService = sessionService;
            UserService = userService;
        }

        public IBotClientService BotClientService { get; set; }
        public IExperienceService ExperienceService { get; set; }
        public IInteractionService InteractionService { get; set; }
        public IOldSchoolAccountService OldSchoolAccountService { get; set; }
        public IPermissionService PermissionService { get; set; }
        public ISessionService SessionService { get; set; }
        public IUserService UserService { get; set; }
    }
}