<script lang="ts">
	import { fade, fly, slide } from 'svelte/transition';
	import { createTodo, getTodos, updateTodo, deleteTodo } from '../../api/todo.js';
	import type {
		CreateTodoInput,
		TodoItem,
		UpdateTodoInput,
		DeleteTodoInput
	} from '$lib/utils/type.js';
	let todos: TodoItem[] = $state([]);
	let newTask: string = $state('');
	let newTaskCount: number = $state(1);
	let newAward: string = $state('');
	let currentCompletedTodo: TodoItem | null = $state(null);
	$inspect(todos);

	$effect(() => {
		fetchTodos();
		return () => {};
	});
	async function fetchTodos() {
		try {
			const fetchedTodos = await getTodos();
			todos = fetchedTodos;
			todos = fetchedTodos.map((todo) => ({ ...todo, ShowCompletionAnimation: false }));
		} catch (error) {
			console.error('Error fetching todos:', error);
		}
	}

	// Function to add a new task
	async function addTask() {
		if (!newTask.trim() || !newAward.trim()) return;

		try {
			const newTodoItem: CreateTodoInput = {
				Task: newTask,
				Award: newAward,
				Completed: false,
				TargetCount: newTaskCount,
				CurrentCount: 0,
				Percentage: 0,
				ShowCompletionAnimation: false
			};
			console.log(JSON.stringify(newTodoItem));
			const createdTodo = await createTodo(newTodoItem);

			// Update the local todos array with the response from the server
			todos = [...todos, createdTodo];

			// Reset the form
			newTask = '';
			newAward = '';
			newTaskCount = 1;
		} catch (error) {
			console.error('Failed to create todo:', error);
		}
	}
	// Function to increment the progress of a task and update the backend
	async function incrementProgress(todo: TodoItem) {
		if (todo.CurrentCount < todo.TargetCount) {
			todo.CurrentCount++;
			todo.Percentage = Math.round((todo.CurrentCount / todo.TargetCount) * 100);

			if (todo.Percentage === 100) {
				todo.ShowCompletionAnimation = true;
				todo.Completed = true;
				currentCompletedTodo = todo;
				setTimeout(() => {
					currentCompletedTodo!.ShowCompletionAnimation = false;
					currentCompletedTodo = null;
				}, 1500);
			}

			// Optionally, you can update the backend here if needed
			const updateTodoInput: UpdateTodoInput = {
				id: todo.ID ?? '',
				Completed: todo.Completed,
				TargetCount: todo.TargetCount,
				CurrentCount: todo.CurrentCount,
				Percentage: todo.Percentage,
				ShowCompletionAnimation: todo.ShowCompletionAnimation
			};
			await updateTodo(updateTodoInput.id, updateTodoInput);
		}
	}

	// Function to delete a task
	async function deleteTask(todo: TodoItem) {
		const deleteTodoInput: DeleteTodoInput = {
			id: todo.ID ?? ''
		};
		await deleteTodo(deleteTodoInput.id);
		todos = todos.filter((t) => t !== todo);
	}

	function handleKeyPress(event: KeyboardEvent) {
		if (event.key === 'Enter') addTask();
	}
</script>

<main class="min-h-screen bg-gradient-to-br from-amber-100 to-violet-50 p-8">
	<div class="flex justify-between">
		<!-- Completed Todos Section -->
		<div
			class="flex h-full w-1/4 flex-col items-center rounded-2xl bg-slate-50 p-6 shadow-2xl transition-all duration-300 hover:scale-105"
			in:fade={{ duration: 300 }}
			out:fade={{ duration: 300 }}
		>
			<h2 class="sticky top-0 mb-4 bg-slate-50 text-2xl font-bold">完成的獎勵</h2>
			{#each todos.filter((todo) => todo.Completed) as completedTodo (completedTodo.ID)}
				<div
					class="mb-2 flex w-full max-w-80 items-center justify-between overflow-x-auto rounded-lg bg-gray-100"
					in:fly={{ y: 20, duration: 300 }}
					out:fly={{ y: -20, duration: 150 }}
				>
					<p class="text-lg text-emerald-500">🏆 {completedTodo.Award}</p>
					<div class="flex items-center">
						<button
							class="ml-2 flex h-10 w-10 items-center justify-center rounded-lg bg-red-500 text-white transition-colors duration-200 hover:bg-red-600"
							onclick={() => deleteTask(completedTodo)}
						>
							×
						</button>
					</div>
				</div>
			{/each}
		</div>
		<!-- Main Todo Section -->
		<div
			class="mx-auto h-full max-w-2xl flex-shrink-0 rounded-xl bg-slate-50 p-8 shadow-2xl transition-all duration-300 hover:scale-105"
		>
			<h1
				class="mb-8 bg-clip-text text-center font-serif text-4xl font-bold text-transparent text-zinc-900"
			>
				🏆 Kai Tea Challenge 🏆
			</h1>

			<div class="mb-8 flex gap-4">
				<div class="flex-1 space-y-2">
					<input
						type="text"
						bind:value={newTask}
						placeholder="媞待辦事項💁"
						class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
						onkeypress={handleKeyPress}
					/>
					<input
						type="text"
						bind:value={newAward}
						placeholder="媞想要的獎勵😍"
						class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
						onkeypress={handleKeyPress}
					/>
				</div>
				<div class="flex items-center gap-2">
					<button
						class=" flex h-8 w-8 items-center justify-center rounded-lg text-xl text-gray-700 transition-all duration-300 hover:scale-110 hover:bg-gray-200"
						onclick={() => (newTaskCount = Math.max(1, newTaskCount - 1))}
					>
						-
					</button>
					<span class="w-12 text-center text-xl font-bold">{newTaskCount}</span>
					<button
						class=" flex h-8 w-8 items-center justify-center rounded-lg text-xl text-gray-700 transition-all duration-300 hover:scale-110 hover:bg-gray-200"
						onclick={() => (newTaskCount = newTaskCount + 1)}
					>
						+
					</button>
				</div>
				<button
					class="rounded-lg bg-blue-500 px-6 py-2 text-white transition-all duration-300 hover:scale-105 hover:bg-blue-600 active:scale-95"
					onclick={addTask}
				>
					Add Task
				</button>
			</div>
			<div class="space-y-4">
				{#each todos as todo}
					{#if !todo.Completed}
						<div
							class="flex items-center gap-4 rounded-lg bg-gray-50 p-4 transition-shadow duration-200 hover:shadow-md"
							in:fly={{ y: 20 }}
							out:slide
						>
							<p class="flex-1 text-lg">{todo.Task}</p>
							<!-- The progress star count starts here -->
							<div class="mr-2 flex gap-1">
								{#each Array(todo.TargetCount) as _value, i}
									{#if i < todo.CurrentCount}
										<span class="text-xl">{_value}⭐️</span>
									{:else}
										<span class="text-xl text-gray-300">☆</span>
									{/if}
								{/each}
							</div>
							<!-- The star count ends here -->
							<!-- The progress button starts here -->
							<div class="flex items-center gap-3 rounded-lg bg-white px-4 py-2 shadow-sm">
								<button
									class="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-white transition-colors duration-200 hover:bg-emerald-600"
									onclick={() => incrementProgress(todo)}
									disabled={todo.Completed}
								>
									+
								</button>
								<span class="w-16 text-center font-medium">
									{todo.CurrentCount}/{todo.TargetCount}
								</span>
							</div>
							<!-- The progress button ends here -->
							<!-- The delete button starts here -->
							<button
								class="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500 text-white transition-colors duration-200 hover:bg-red-600"
								onclick={() => deleteTask(todo)}
							>
								×
							</button>
						</div>
					{/if}
				{/each}
			</div>
		</div>
		<!-- The delete button ends here -->
		{#if currentCompletedTodo?.ShowCompletionAnimation}
			<div
				class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
				transition:fade={{ duration: 500 }}
			>
				<div class="rounded-xl bg-white p-8 shadow-2xl" transition:fly={{ y: 0, duration: 500 }}>
					<h2 class="mb-4 text-center text-4xl font-bold text-emerald-500">🎉 妳完成了！ 🎉</h2>
					<p class="mb-4 text-center text-2xl text-gray-600">
						恭喜完成 "{currentCompletedTodo?.Task}"！
					</p>
					<p class="text-center text-3xl font-bold text-emerald-500">
						可以跟齊索取: {currentCompletedTodo?.Award} 🏆
					</p>
				</div>
			</div>
		{/if}
	</div>
</main>
