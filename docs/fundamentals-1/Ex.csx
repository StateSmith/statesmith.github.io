#!/usr/bin/env dotnet-script
#r "nuget: StateSmith, 0.8.10-alpha"

// This is a C# script file. Very useful for running StateSmith.
// https://github.com/StateSmith/StateSmith/wiki/Using-c%23-script-files-(.CSX)-instead-of-solutions-and-projects

using System.Text.RegularExpressions;
using StateSmith.Input.Expansions;
using StateSmith.Output;
using StateSmith.Output.UserConfig;
using StateSmith.Runner;
using StateSmith.Common;
using StateSmith.SmGraph.Visitors;
using StateSmith.SmGraph;
using StateSmith.Output.Gil;
using StateSmith.Input.DrawIo;

GenSimple();

static void GenSimple()
{
    var list = new List<string>{"Ex01", "Ex01Polled", "Ex02", "Ex03", "Ex04", "Ex05", "Ex06", "Ex08", "Ex10"};

    foreach (var exName in list)
    {
        SmRunner runner = new(diagramPath: $"{exName}.drawio.svg", new Ex10Glue(), transpilerId: TranspilerId.JavaScript);
        AddTransformers(runner);
        runner.Run();
    }
}

// static void GenEx10()
// {
//     SmRunner runner = new(diagramPath: "Ex10.drawio.svg", new Ex10Glue(), transpilerId: TranspilerId.JavaScript);
//     AddTransformers(runner);
//     runner.Run();
// }

static void AddTransformers(SmRunner runner)
{
    TracingModder tm = new();
    runner.SmTransformer.InsertAfterFirstMatch(StandardSmTransformer.TransformationId.Standard_Validation1, new TransformationStep(id: nameof(MyTracingModder), action: (sm) => new MyTracingModder().AddTracingBehaviors(sm)));
    runner.SmTransformer.InsertBeforeFirstMatch(StandardSmTransformer.TransformationId.Standard_SupportOrderAndElse, new TransformationStep(id: "", FixUpNonTransitionBehaviorIds));
}

// needs to happen before behavior re-ordering!
static void FixUpNonTransitionBehaviorIds(StateMachine sm)
{
    sm.VisitTypeRecursively<NamedVertex>(v => {
        var list = v.DiagramSubIds.ToList();
        foreach (var b in v.Behaviors)
        {
            if (b.DiagramId == "")
            {
                b.DiagramId = list[0];
                list.RemoveAt(0);
            }
        }
    });
}

//-------------------------------------------------------

// ignore C# guidelines for script stuff below
#pragma warning disable IDE1006, CA1050


/// <summary>
/// This class is read by StateSmith to determine configuration and expansions.
/// </summary>
public class Ex10Glue : IRenderConfigJavaScript
{
    string IRenderConfigJavaScript.ExtendsSuperClass => "Ex10Base";

    string IRenderConfig.AutoExpandedVars => @"
        count: 0,
        switch_is_on: false,
    ";

    string IRenderConfig.VariableDeclarations => @"
        t1_start_ms: 0,
    ";

    /// <summary>
    /// These expansions allow you to write clear concise code in diagrams.
    /// More info: https://github.com/StateSmith/StateSmith/blob/main/docs/diagram-features.md#write-code-directly-or-use-expansions
    /// </summary>
    public class MyExpansions : UserExpansionScriptBase
    {
        public string trace_action(string actionCode, string behaviorId, string umlDescription) => $"this.{AutoNameCopy()}({actionCode}, {behaviorId}, {umlDescription})";
        public string trace_transition(string behaviorId) => $"this.{AutoNameCopy()}({behaviorId})";
        public string trace_enter(string stateName, string id) => $"this.{AutoNameCopy()}({stateName}, {id})";
        public string trace_exit(string stateName, string id) => $"this.{AutoNameCopy()}({stateName}, {id})";

        public string light_off() => $"this.{AutoNameCopy()}()";
        public string light_blue() => $"this.{AutoNameCopy()}()";
        public string light_yellow() => $"this.{AutoNameCopy()}()";
        public string light_red() => $"this.{AutoNameCopy()}()";

        // could also use regular js timers instead
        public string t1_start_ms => $"{AutoVarName()}";
        public string now_ms => $"Date.now()";
        public string t1_ms => $"{now_ms} - {t1_start_ms}";
        public string t1Restart() => $"{t1_start_ms} = {now_ms}";
        public string t1After(string timeStr) => $"{t1_ms} >= {TimeStrToMs(timeStr)}";
    }

    public static string TimeStrToMs(string timeStr)
    {
        return TimeStringParser.ElapsedTimeStringToMs(timeStr).ToString();
    }
}



public class MyTracingModder : NamedVisitor
{
    public void AddTracingBehaviors(StateMachine stateMachine)
    {
        Visit(stateMachine);
    }

    public override void Visit(Vertex v)
    {
        foreach (var b in v.Behaviors)
        {
            if (b.HasTransition())
            {
                b.actionCode = $"trace_transition(\"{b.DiagramId}\");" + EscapeCharsForString(b.actionCode);
            }
            else if (b.HasActionCode())
            {
                var uml = b.DescribeAsUml();
                string escapedUml = EscapeCharsForString(uml);

                b.actionCode = $"trace_action(\"{EscapeCharsForString(b.actionCode)}\", \"{b.DiagramId}\", \"{escapedUml}\");" + b.actionCode;
            }
        }

        VisitChildren(v);
    }

    public override void Visit(NamedVertex v)
    {
        Visit((Vertex)v);

        if (v is not StateMachine)
        {
            v.AddBehavior(index: 0, behavior: new Behavior(trigger: TriggerHelper.TRIGGER_ENTER, guardCode: null, actionCode: $"trace_enter(\"{v.Name}\", \"{v.DiagramId}\");"));
            v.AddBehavior(index: 0, behavior: new Behavior(trigger: TriggerHelper.TRIGGER_EXIT, guardCode: null, actionCode: $"trace_exit(\"{v.Name}\", \"{v.DiagramId}\");"));
        }
    }

    public override void Visit(NotesVertex v)
    {
        // ignore
    }

    public override void Visit(InitialState v)
    {
        Visit((Vertex)v);
    }

    static string EscapeCharsForString(string str)
    {
        if (str == null) return null;

        str = StringUtils.ReplaceNewLineChars(str, "\\n");
        str = Regex.Replace(str, @"(\\|"")", "\\$1");
        return str;
    }
}
