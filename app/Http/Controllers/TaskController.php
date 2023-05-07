<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use App\Models\Category;
use App\Http\Requests\createTaskRequest;
use App\Http\Requests\updateTaskRequest;

class TaskController extends Controller
{
    public function index()
    {
        return Task::with('category')->paginate(12);
    }

    public function store(Request $request, Category $category)
    {
        $task = Task::create([
            'title' => $request->title,
            'body' => $request->body,
            'category_id' => $request->category_id
        ]);

        return $task;
    }

    public function show(Task $task)
    {
        return $task;
    }

    public function update(updateTaskRequest $request, Task $task)
    {
        $task->update([
            'title' => $request->title,
            'body' => $request->body,
            'category_id' => $request->category_id,
            'done' => $request->done
        ]);

        return $task;
    }

    public function destroy(Task $task)
    {
         $task->delete();
         return ['message' => 'Votre tâche a été supprimée'];
    }

    public function getTaskByCategory(Category $category)
    {
        return $category->tasks()->with('category')->paginate(12);
    }

    public function getTaskOrderBy($column, $direction)
    {
        return Task::with('category')->orderBy($column, $direction)->paginate(12);
    }

    public function getTaskByTerm($term)
    {
        $tasks = Task::with('category')
            ->where(function($query) use($term) {
                $query->where('title', 'like', '%'.$term.'%')
                    ->orWhere('body', 'like', '%'.$term.'%')
                    ->orWhere('id', 'like', '%'.$term.'%');
            })
            ->paginate(10);

        return $tasks;
    }
}
