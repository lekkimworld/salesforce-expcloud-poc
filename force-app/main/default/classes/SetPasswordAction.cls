public class SetPasswordAction {

    @InvocableMethod(label='Set user password' description='Sets the password for supplied user IDs')
    public static List<SetPasswordOutput> setPassword(List<SetPasswordInput> input){
        for (SetPasswordInput i : input) {
            System.setPassword(i.userId, i.password);
        }

        return new SetPasswordOutput[]{new SetPasswordOutput(true)};
    }
    
    
    public class SetPasswordInput {
        
        @InvocableVariable
        public String password;

        @InvocableVariable
        public Id userId;
        
    }
    
    public class SetPasswordOutput {
        public SetPasswordOutput(boolean b) {
            this.status = b;
        }

        @InvocableVariable
        public Boolean status;
    }
}