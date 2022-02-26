namespace Compedia.Libs.LanguageExtensions;

public static class ScopeExtensions
{
    public static T Apply<T>(this T value, Action<T> action)
    {
        if (!EqualityComparer<T>.Default.Equals(value, default)) action(value);
        return value;
    }

    public static void Consume<T>(this Action<T>[] actions, T obj)
    {
        foreach(var action in actions)
        {
            action(obj);
        }
    }
}
