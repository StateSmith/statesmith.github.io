// Autogenerated with StateSmith 0.8.13-alpha.
// Algorithm: Balanced1. See https://github.com/StateSmith/StateSmith/wiki/Algorithms

// Generated state machine
class Ex07 extends Ex10Base
{
    static EventId = 
    {
        DIM : 0,
        INCREASE : 1,
    }
    static { Object.freeze(this.EventId); }
    
    static EventIdCount = 2;
    static { Object.freeze(this.EventIdCount); }
    
    static StateId = 
    {
        ROOT : 0,
        OFF : 1,
        ON : 2,
        ON1 : 3,
        ON2 : 4,
    }
    static { Object.freeze(this.StateId); }
    
    static StateIdCount = 5;
    static { Object.freeze(this.StateIdCount); }
    
    // Used internally by state machine. Feel free to inspect, but don't modify.
    stateId;
    
    // Used internally by state machine. Don't modify.
    #ancestorEventHandler;
    
    // Used internally by state machine. Don't modify.
    #currentEventHandlers = Array(Ex07.EventIdCount).fill(undefined);
    
    // Used internally by state machine. Don't modify.
    #currentStateExitHandler;
    
    // Variables. Can be used for inputs, outputs, user variables...
    vars = {
        t1_start_ms: 0,
        count: 0,
        switch_is_on: false,
    };
    
    // Starts the state machine. Must be called before dispatching events. Not thread safe.
    start()
    {
        this.#ROOT_enter();
        // ROOT behavior
        // uml: TransitionTo(ROOT.InitialState)
        {
            // Step 1: Exit states until we reach `ROOT` state (Least Common Ancestor for transition). Already at LCA, no exiting required.
            
            // Step 2: Transition action: ``.
            
            // Step 3: Enter/move towards transition target `ROOT.InitialState`.
            // ROOT.InitialState is a pseudo state and cannot have an `enter` trigger.
            
            // ROOT.InitialState behavior
            // uml: / { trace_transition("48"); } TransitionTo(OFF)
            {
                // Step 1: Exit states until we reach `ROOT` state (Least Common Ancestor for transition). Already at LCA, no exiting required.
                
                // Step 2: Transition action: `trace_transition("48");`.
                this.trace_transition("48");
                
                // Step 3: Enter/move towards transition target `OFF`.
                this.#OFF_enter();
                
                // Step 4: complete transition. Ends event dispatch. No other behaviors are checked.
                this.stateId = Ex07.StateId.OFF;
                // No ancestor handles event. Can skip nulling `ancestorEventHandler`.
                return;
            } // end of behavior for ROOT.InitialState
        } // end of behavior for ROOT
    }
    
    // Dispatches an event to the state machine. Not thread safe.
    dispatchEvent(eventId)
    {
        let behaviorFunc = this.#currentEventHandlers[eventId];
        
        while (behaviorFunc != null)
        {
            this.#ancestorEventHandler = null;
            behaviorFunc.call(this);
            behaviorFunc = this.#ancestorEventHandler;
        }
    }
    
    // This function is used when StateSmith doesn't know what the active leaf state is at
    // compile time due to sub states or when multiple states need to be exited.
    #exitUpToStateHandler(desiredStateExitHandler)
    {
        while (this.#currentStateExitHandler != desiredStateExitHandler)
        {
            this.#currentStateExitHandler.call(this);
        }
    }
    
    
    ////////////////////////////////////////////////////////////////////////////////
    // event handlers for state ROOT
    ////////////////////////////////////////////////////////////////////////////////
    
    #ROOT_enter()
    {
        // setup trigger/event handlers
        this.#currentStateExitHandler = this.#ROOT_exit;
    }
    
    #ROOT_exit()
    {
    }
    
    
    ////////////////////////////////////////////////////////////////////////////////
    // event handlers for state OFF
    ////////////////////////////////////////////////////////////////////////////////
    
    #OFF_enter()
    {
        // setup trigger/event handlers
        this.#currentStateExitHandler = this.#OFF_exit;
        this.#currentEventHandlers[Ex07.EventId.INCREASE] = this.#OFF_increase;
        
        // OFF behavior
        // uml: enter / { trace_enter("OFF", "16"); }
        {
            // Step 1: execute action `trace_enter("OFF", "16");`
            this.trace_enter("OFF", "16");
        } // end of behavior for OFF
        
        // OFF behavior
        // uml: enter / { trace_action("light_off();", "17", "enter / { light_off(); }");light_off(); }
        {
            // Step 1: execute action `trace_action("light_off();", "17", "enter / { light_off(); }");light_off();`
            this.trace_action("light_off();", "17", "enter / { light_off(); }");this.light_off();
        } // end of behavior for OFF
    }
    
    #OFF_exit()
    {
        // OFF behavior
        // uml: exit / { trace_exit("OFF", "16"); }
        {
            // Step 1: execute action `trace_exit("OFF", "16");`
            this.trace_exit("OFF", "16");
        } // end of behavior for OFF
        
        // adjust function pointers for this state's exit
        this.#currentStateExitHandler = this.#ROOT_exit;
        this.#currentEventHandlers[Ex07.EventId.INCREASE] = null;  // no ancestor listens to this event
    }
    
    #OFF_increase()
    {
        // No ancestor state handles `increase` event.
        
        // OFF behavior
        // uml: INCREASE / { trace_transition("58"); } TransitionTo(ON)
        {
            // Step 1: Exit states until we reach `ROOT` state (Least Common Ancestor for transition).
            this.#OFF_exit();
            
            // Step 2: Transition action: `trace_transition("58");`.
            this.trace_transition("58");
            
            // Step 3: Enter/move towards transition target `ON`.
            this.#ON_enter();
            
            // ON.InitialState behavior
            // uml: / { trace_transition("55"); } TransitionTo(ON.ChoicePoint())
            {
                // Step 1: Exit states until we reach `ON` state (Least Common Ancestor for transition). Already at LCA, no exiting required.
                
                // Step 2: Transition action: `trace_transition("55");`.
                this.trace_transition("55");
                
                // Step 3: Enter/move towards transition target `ON.ChoicePoint()`.
                // ON.ChoicePoint() is a pseudo state and cannot have an `enter` trigger.
                
                // ON.ChoicePoint() behavior
                // uml: [count % 2 == 0] / { trace_transition("57"); } TransitionTo(ON1)
                if (this.vars.count % 2 == 0)
                {
                    // Step 1: Exit states until we reach `ON` state (Least Common Ancestor for transition). Already at LCA, no exiting required.
                    
                    // Step 2: Transition action: `trace_transition("57");`.
                    this.trace_transition("57");
                    
                    // Step 3: Enter/move towards transition target `ON1`.
                    this.#ON1_enter();
                    
                    // Step 4: complete transition. Ends event dispatch. No other behaviors are checked.
                    this.stateId = Ex07.StateId.ON1;
                    // No ancestor handles event. Can skip nulling `ancestorEventHandler`.
                    return;
                } // end of behavior for ON.ChoicePoint()
                
                // ON.ChoicePoint() behavior
                // uml: else / { trace_transition("56"); } TransitionTo(ON2)
                {
                    // Step 1: Exit states until we reach `ON` state (Least Common Ancestor for transition). Already at LCA, no exiting required.
                    
                    // Step 2: Transition action: `trace_transition("56");`.
                    this.trace_transition("56");
                    
                    // Step 3: Enter/move towards transition target `ON2`.
                    this.#ON2_enter();
                    
                    // Step 4: complete transition. Ends event dispatch. No other behaviors are checked.
                    this.stateId = Ex07.StateId.ON2;
                    // No ancestor handles event. Can skip nulling `ancestorEventHandler`.
                    return;
                } // end of behavior for ON.ChoicePoint()
            } // end of behavior for ON.InitialState
        } // end of behavior for OFF
    }
    
    
    ////////////////////////////////////////////////////////////////////////////////
    // event handlers for state ON
    ////////////////////////////////////////////////////////////////////////////////
    
    #ON_enter()
    {
        // setup trigger/event handlers
        this.#currentStateExitHandler = this.#ON_exit;
        this.#currentEventHandlers[Ex07.EventId.DIM] = this.#ON_dim;
        
        // ON behavior
        // uml: enter / { trace_enter("ON", "52"); }
        {
            // Step 1: execute action `trace_enter("ON", "52");`
            this.trace_enter("ON", "52");
        } // end of behavior for ON
    }
    
    #ON_exit()
    {
        // ON behavior
        // uml: exit / { trace_exit("ON", "52"); }
        {
            // Step 1: execute action `trace_exit("ON", "52");`
            this.trace_exit("ON", "52");
        } // end of behavior for ON
        
        // ON behavior
        // uml: exit / { trace_action("count++;", "53", "exit / { count++; }");count++; }
        {
            // Step 1: execute action `trace_action("count++;", "53", "exit / { count++; }");count++;`
            this.trace_action("count++;", "53", "exit / { count++; }");this.vars.count++;
        } // end of behavior for ON
        
        // adjust function pointers for this state's exit
        this.#currentStateExitHandler = this.#ROOT_exit;
        this.#currentEventHandlers[Ex07.EventId.DIM] = null;  // no ancestor listens to this event
    }
    
    #ON_dim()
    {
        // No ancestor state handles `dim` event.
        
        // ON behavior
        // uml: DIM / { trace_transition("59"); } TransitionTo(OFF)
        {
            // Step 1: Exit states until we reach `ROOT` state (Least Common Ancestor for transition).
            this.#exitUpToStateHandler(this.#ROOT_exit);
            
            // Step 2: Transition action: `trace_transition("59");`.
            this.trace_transition("59");
            
            // Step 3: Enter/move towards transition target `OFF`.
            this.#OFF_enter();
            
            // Step 4: complete transition. Ends event dispatch. No other behaviors are checked.
            this.stateId = Ex07.StateId.OFF;
            // No ancestor handles event. Can skip nulling `ancestorEventHandler`.
            return;
        } // end of behavior for ON
    }
    
    
    ////////////////////////////////////////////////////////////////////////////////
    // event handlers for state ON1
    ////////////////////////////////////////////////////////////////////////////////
    
    #ON1_enter()
    {
        // setup trigger/event handlers
        this.#currentStateExitHandler = this.#ON1_exit;
        
        // ON1 behavior
        // uml: enter / { trace_enter("ON1", "23"); }
        {
            // Step 1: execute action `trace_enter("ON1", "23");`
            this.trace_enter("ON1", "23");
        } // end of behavior for ON1
        
        // ON1 behavior
        // uml: enter / { trace_action("light_blue();", "24", "enter / { light_blue(); }");light_blue(); }
        {
            // Step 1: execute action `trace_action("light_blue();", "24", "enter / { light_blue(); }");light_blue();`
            this.trace_action("light_blue();", "24", "enter / { light_blue(); }");this.light_blue();
        } // end of behavior for ON1
    }
    
    #ON1_exit()
    {
        // ON1 behavior
        // uml: exit / { trace_exit("ON1", "23"); }
        {
            // Step 1: execute action `trace_exit("ON1", "23");`
            this.trace_exit("ON1", "23");
        } // end of behavior for ON1
        
        // adjust function pointers for this state's exit
        this.#currentStateExitHandler = this.#ON_exit;
    }
    
    
    ////////////////////////////////////////////////////////////////////////////////
    // event handlers for state ON2
    ////////////////////////////////////////////////////////////////////////////////
    
    #ON2_enter()
    {
        // setup trigger/event handlers
        this.#currentStateExitHandler = this.#ON2_exit;
        
        // ON2 behavior
        // uml: enter / { trace_enter("ON2", "49"); }
        {
            // Step 1: execute action `trace_enter("ON2", "49");`
            this.trace_enter("ON2", "49");
        } // end of behavior for ON2
        
        // ON2 behavior
        // uml: enter / { trace_action("light_red();", "50", "enter / { light_red(); }");light_red(); }
        {
            // Step 1: execute action `trace_action("light_red();", "50", "enter / { light_red(); }");light_red();`
            this.trace_action("light_red();", "50", "enter / { light_red(); }");this.light_red();
        } // end of behavior for ON2
    }
    
    #ON2_exit()
    {
        // ON2 behavior
        // uml: exit / { trace_exit("ON2", "49"); }
        {
            // Step 1: execute action `trace_exit("ON2", "49");`
            this.trace_exit("ON2", "49");
        } // end of behavior for ON2
        
        // adjust function pointers for this state's exit
        this.#currentStateExitHandler = this.#ON_exit;
    }
    
    // Thread safe.
    static stateIdToString(id)
    {
        switch (id)
        {
            case Ex07.StateId.ROOT: return "ROOT";
            case Ex07.StateId.OFF: return "OFF";
            case Ex07.StateId.ON: return "ON";
            case Ex07.StateId.ON1: return "ON1";
            case Ex07.StateId.ON2: return "ON2";
            default: return "?";
        }
    }
    
    // Thread safe.
    static eventIdToString(id)
    {
        switch (id)
        {
            case Ex07.EventId.DIM: return "DIM";
            case Ex07.EventId.INCREASE: return "INCREASE";
            default: return "?";
        }
    }
}
