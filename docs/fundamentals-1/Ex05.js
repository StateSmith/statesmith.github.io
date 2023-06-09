// Autogenerated with StateSmith 0.8.13-alpha.
// Algorithm: Balanced1. See https://github.com/StateSmith/StateSmith/wiki/Algorithms

// Generated state machine
class Ex05 extends Ex10Base
{
    static EventId = 
    {
        DIM : 0,
        INCREASE : 1,
        OFF : 2,
    }
    static { Object.freeze(this.EventId); }
    
    static EventIdCount = 3;
    static { Object.freeze(this.EventIdCount); }
    
    static StateId = 
    {
        ROOT : 0,
        OFF : 1,
        ON_GROUP : 2,
        ON_HOT : 3,
        ON1 : 4,
        ON2 : 5,
    }
    static { Object.freeze(this.StateId); }
    
    static StateIdCount = 6;
    static { Object.freeze(this.StateIdCount); }
    
    // Used internally by state machine. Feel free to inspect, but don't modify.
    stateId;
    
    // Used internally by state machine. Don't modify.
    #ancestorEventHandler;
    
    // Used internally by state machine. Don't modify.
    #currentEventHandlers = Array(Ex05.EventIdCount).fill(undefined);
    
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
            // uml: / { trace_transition("77"); } TransitionTo(OFF)
            {
                // Step 1: Exit states until we reach `ROOT` state (Least Common Ancestor for transition). Already at LCA, no exiting required.
                
                // Step 2: Transition action: `trace_transition("77");`.
                this.trace_transition("77");
                
                // Step 3: Enter/move towards transition target `OFF`.
                this.#OFF_enter();
                
                // Step 4: complete transition. Ends event dispatch. No other behaviors are checked.
                this.stateId = Ex05.StateId.OFF;
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
        this.#currentEventHandlers[Ex05.EventId.INCREASE] = this.#OFF_increase;
        
        // OFF behavior
        // uml: enter / { trace_enter("OFF", "79"); }
        {
            // Step 1: execute action `trace_enter("OFF", "79");`
            this.trace_enter("OFF", "79");
        } // end of behavior for OFF
        
        // OFF behavior
        // uml: enter / { trace_action("light_off();", "80", "enter / { light_off(); }");light_off(); }
        {
            // Step 1: execute action `trace_action("light_off();", "80", "enter / { light_off(); }");light_off();`
            this.trace_action("light_off();", "80", "enter / { light_off(); }");this.light_off();
        } // end of behavior for OFF
    }
    
    #OFF_exit()
    {
        // OFF behavior
        // uml: exit / { trace_exit("OFF", "79"); }
        {
            // Step 1: execute action `trace_exit("OFF", "79");`
            this.trace_exit("OFF", "79");
        } // end of behavior for OFF
        
        // adjust function pointers for this state's exit
        this.#currentStateExitHandler = this.#ROOT_exit;
        this.#currentEventHandlers[Ex05.EventId.INCREASE] = null;  // no ancestor listens to this event
    }
    
    #OFF_increase()
    {
        // No ancestor state handles `increase` event.
        
        // OFF behavior
        // uml: INCREASE / { trace_transition("83"); } TransitionTo(ON1)
        {
            // Step 1: Exit states until we reach `ROOT` state (Least Common Ancestor for transition).
            this.#OFF_exit();
            
            // Step 2: Transition action: `trace_transition("83");`.
            this.trace_transition("83");
            
            // Step 3: Enter/move towards transition target `ON1`.
            this.#ON_GROUP_enter();
            this.#ON1_enter();
            
            // Step 4: complete transition. Ends event dispatch. No other behaviors are checked.
            this.stateId = Ex05.StateId.ON1;
            // No ancestor handles event. Can skip nulling `ancestorEventHandler`.
            return;
        } // end of behavior for OFF
    }
    
    
    ////////////////////////////////////////////////////////////////////////////////
    // event handlers for state ON_GROUP
    ////////////////////////////////////////////////////////////////////////////////
    
    #ON_GROUP_enter()
    {
        // setup trigger/event handlers
        this.#currentStateExitHandler = this.#ON_GROUP_exit;
        this.#currentEventHandlers[Ex05.EventId.OFF] = this.#ON_GROUP_off;
        
        // ON_GROUP behavior
        // uml: enter / { trace_enter("ON_GROUP", "63"); }
        {
            // Step 1: execute action `trace_enter("ON_GROUP", "63");`
            this.trace_enter("ON_GROUP", "63");
        } // end of behavior for ON_GROUP
    }
    
    #ON_GROUP_exit()
    {
        // ON_GROUP behavior
        // uml: exit / { trace_exit("ON_GROUP", "63"); }
        {
            // Step 1: execute action `trace_exit("ON_GROUP", "63");`
            this.trace_exit("ON_GROUP", "63");
        } // end of behavior for ON_GROUP
        
        // adjust function pointers for this state's exit
        this.#currentStateExitHandler = this.#ROOT_exit;
        this.#currentEventHandlers[Ex05.EventId.OFF] = null;  // no ancestor listens to this event
    }
    
    #ON_GROUP_off()
    {
        // No ancestor state handles `off` event.
        
        // ON_GROUP behavior
        // uml: OFF / { trace_transition("81"); } TransitionTo(OFF)
        {
            // Step 1: Exit states until we reach `ROOT` state (Least Common Ancestor for transition).
            this.#exitUpToStateHandler(this.#ROOT_exit);
            
            // Step 2: Transition action: `trace_transition("81");`.
            this.trace_transition("81");
            
            // Step 3: Enter/move towards transition target `OFF`.
            this.#OFF_enter();
            
            // Step 4: complete transition. Ends event dispatch. No other behaviors are checked.
            this.stateId = Ex05.StateId.OFF;
            // No ancestor handles event. Can skip nulling `ancestorEventHandler`.
            return;
        } // end of behavior for ON_GROUP
    }
    
    
    ////////////////////////////////////////////////////////////////////////////////
    // event handlers for state ON_HOT
    ////////////////////////////////////////////////////////////////////////////////
    
    #ON_HOT_enter()
    {
        // setup trigger/event handlers
        this.#currentStateExitHandler = this.#ON_HOT_exit;
        this.#currentEventHandlers[Ex05.EventId.DIM] = this.#ON_HOT_dim;
        
        // ON_HOT behavior
        // uml: enter / { trace_enter("ON_HOT", "73"); }
        {
            // Step 1: execute action `trace_enter("ON_HOT", "73");`
            this.trace_enter("ON_HOT", "73");
        } // end of behavior for ON_HOT
        
        // ON_HOT behavior
        // uml: enter / { trace_action("light_red();", "74", "enter / { light_red(); }");light_red(); }
        {
            // Step 1: execute action `trace_action("light_red();", "74", "enter / { light_red(); }");light_red();`
            this.trace_action("light_red();", "74", "enter / { light_red(); }");this.light_red();
        } // end of behavior for ON_HOT
    }
    
    #ON_HOT_exit()
    {
        // ON_HOT behavior
        // uml: exit / { trace_exit("ON_HOT", "73"); }
        {
            // Step 1: execute action `trace_exit("ON_HOT", "73");`
            this.trace_exit("ON_HOT", "73");
        } // end of behavior for ON_HOT
        
        // adjust function pointers for this state's exit
        this.#currentStateExitHandler = this.#ON_GROUP_exit;
        this.#currentEventHandlers[Ex05.EventId.DIM] = null;  // no ancestor listens to this event
    }
    
    #ON_HOT_dim()
    {
        // No ancestor state handles `dim` event.
        
        // ON_HOT behavior
        // uml: DIM / { trace_transition("84"); } TransitionTo(ON2)
        {
            // Step 1: Exit states until we reach `ON_GROUP` state (Least Common Ancestor for transition).
            this.#ON_HOT_exit();
            
            // Step 2: Transition action: `trace_transition("84");`.
            this.trace_transition("84");
            
            // Step 3: Enter/move towards transition target `ON2`.
            this.#ON2_enter();
            
            // Step 4: complete transition. Ends event dispatch. No other behaviors are checked.
            this.stateId = Ex05.StateId.ON2;
            // No ancestor handles event. Can skip nulling `ancestorEventHandler`.
            return;
        } // end of behavior for ON_HOT
    }
    
    
    ////////////////////////////////////////////////////////////////////////////////
    // event handlers for state ON1
    ////////////////////////////////////////////////////////////////////////////////
    
    #ON1_enter()
    {
        // setup trigger/event handlers
        this.#currentStateExitHandler = this.#ON1_exit;
        this.#currentEventHandlers[Ex05.EventId.DIM] = this.#ON1_dim;
        this.#currentEventHandlers[Ex05.EventId.INCREASE] = this.#ON1_increase;
        
        // ON1 behavior
        // uml: enter / { trace_enter("ON1", "65"); }
        {
            // Step 1: execute action `trace_enter("ON1", "65");`
            this.trace_enter("ON1", "65");
        } // end of behavior for ON1
        
        // ON1 behavior
        // uml: enter / { trace_action("light_blue();", "66", "enter / { light_blue(); }");light_blue(); }
        {
            // Step 1: execute action `trace_action("light_blue();", "66", "enter / { light_blue(); }");light_blue();`
            this.trace_action("light_blue();", "66", "enter / { light_blue(); }");this.light_blue();
        } // end of behavior for ON1
    }
    
    #ON1_exit()
    {
        // ON1 behavior
        // uml: exit / { trace_exit("ON1", "65"); }
        {
            // Step 1: execute action `trace_exit("ON1", "65");`
            this.trace_exit("ON1", "65");
        } // end of behavior for ON1
        
        // adjust function pointers for this state's exit
        this.#currentStateExitHandler = this.#ON_GROUP_exit;
        this.#currentEventHandlers[Ex05.EventId.DIM] = null;  // no ancestor listens to this event
        this.#currentEventHandlers[Ex05.EventId.INCREASE] = null;  // no ancestor listens to this event
    }
    
    #ON1_dim()
    {
        // No ancestor state handles `dim` event.
        
        // ON1 behavior
        // uml: DIM / { trace_transition("82"); } TransitionTo(OFF)
        {
            // Step 1: Exit states until we reach `ROOT` state (Least Common Ancestor for transition).
            this.#exitUpToStateHandler(this.#ROOT_exit);
            
            // Step 2: Transition action: `trace_transition("82");`.
            this.trace_transition("82");
            
            // Step 3: Enter/move towards transition target `OFF`.
            this.#OFF_enter();
            
            // Step 4: complete transition. Ends event dispatch. No other behaviors are checked.
            this.stateId = Ex05.StateId.OFF;
            // No ancestor handles event. Can skip nulling `ancestorEventHandler`.
            return;
        } // end of behavior for ON1
    }
    
    #ON1_increase()
    {
        // No ancestor state handles `increase` event.
        
        // ON1 behavior
        // uml: INCREASE / { trace_transition("72"); } TransitionTo(ON2)
        {
            // Step 1: Exit states until we reach `ON_GROUP` state (Least Common Ancestor for transition).
            this.#ON1_exit();
            
            // Step 2: Transition action: `trace_transition("72");`.
            this.trace_transition("72");
            
            // Step 3: Enter/move towards transition target `ON2`.
            this.#ON2_enter();
            
            // Step 4: complete transition. Ends event dispatch. No other behaviors are checked.
            this.stateId = Ex05.StateId.ON2;
            // No ancestor handles event. Can skip nulling `ancestorEventHandler`.
            return;
        } // end of behavior for ON1
    }
    
    
    ////////////////////////////////////////////////////////////////////////////////
    // event handlers for state ON2
    ////////////////////////////////////////////////////////////////////////////////
    
    #ON2_enter()
    {
        // setup trigger/event handlers
        this.#currentStateExitHandler = this.#ON2_exit;
        this.#currentEventHandlers[Ex05.EventId.DIM] = this.#ON2_dim;
        this.#currentEventHandlers[Ex05.EventId.INCREASE] = this.#ON2_increase;
        
        // ON2 behavior
        // uml: enter / { trace_enter("ON2", "67"); }
        {
            // Step 1: execute action `trace_enter("ON2", "67");`
            this.trace_enter("ON2", "67");
        } // end of behavior for ON2
        
        // ON2 behavior
        // uml: enter / { trace_action("light_yellow();", "68", "enter / { light_yellow(); }");light_yellow(); }
        {
            // Step 1: execute action `trace_action("light_yellow();", "68", "enter / { light_yellow(); }");light_yellow();`
            this.trace_action("light_yellow();", "68", "enter / { light_yellow(); }");this.light_yellow();
        } // end of behavior for ON2
    }
    
    #ON2_exit()
    {
        // ON2 behavior
        // uml: exit / { trace_exit("ON2", "67"); }
        {
            // Step 1: execute action `trace_exit("ON2", "67");`
            this.trace_exit("ON2", "67");
        } // end of behavior for ON2
        
        // adjust function pointers for this state's exit
        this.#currentStateExitHandler = this.#ON_GROUP_exit;
        this.#currentEventHandlers[Ex05.EventId.DIM] = null;  // no ancestor listens to this event
        this.#currentEventHandlers[Ex05.EventId.INCREASE] = null;  // no ancestor listens to this event
    }
    
    #ON2_dim()
    {
        // No ancestor state handles `dim` event.
        
        // ON2 behavior
        // uml: DIM / { trace_transition("71"); } TransitionTo(ON1)
        {
            // Step 1: Exit states until we reach `ON_GROUP` state (Least Common Ancestor for transition).
            this.#ON2_exit();
            
            // Step 2: Transition action: `trace_transition("71");`.
            this.trace_transition("71");
            
            // Step 3: Enter/move towards transition target `ON1`.
            this.#ON1_enter();
            
            // Step 4: complete transition. Ends event dispatch. No other behaviors are checked.
            this.stateId = Ex05.StateId.ON1;
            // No ancestor handles event. Can skip nulling `ancestorEventHandler`.
            return;
        } // end of behavior for ON2
    }
    
    #ON2_increase()
    {
        // No ancestor state handles `increase` event.
        
        // ON2 behavior
        // uml: INCREASE / { trace_transition("75"); } TransitionTo(ON_HOT)
        {
            // Step 1: Exit states until we reach `ON_GROUP` state (Least Common Ancestor for transition).
            this.#ON2_exit();
            
            // Step 2: Transition action: `trace_transition("75");`.
            this.trace_transition("75");
            
            // Step 3: Enter/move towards transition target `ON_HOT`.
            this.#ON_HOT_enter();
            
            // Step 4: complete transition. Ends event dispatch. No other behaviors are checked.
            this.stateId = Ex05.StateId.ON_HOT;
            // No ancestor handles event. Can skip nulling `ancestorEventHandler`.
            return;
        } // end of behavior for ON2
    }
    
    // Thread safe.
    static stateIdToString(id)
    {
        switch (id)
        {
            case Ex05.StateId.ROOT: return "ROOT";
            case Ex05.StateId.OFF: return "OFF";
            case Ex05.StateId.ON_GROUP: return "ON_GROUP";
            case Ex05.StateId.ON_HOT: return "ON_HOT";
            case Ex05.StateId.ON1: return "ON1";
            case Ex05.StateId.ON2: return "ON2";
            default: return "?";
        }
    }
    
    // Thread safe.
    static eventIdToString(id)
    {
        switch (id)
        {
            case Ex05.EventId.DIM: return "DIM";
            case Ex05.EventId.INCREASE: return "INCREASE";
            case Ex05.EventId.OFF: return "OFF";
            default: return "?";
        }
    }
}
