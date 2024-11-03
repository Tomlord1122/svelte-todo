<script lang="ts">
	import type { TodoItem } from '../lib/types/type.js';
	import { fade, fly, slide, scale } from 'svelte/transition';

	let todos = $state<TodoItem[]>([]);
	let newTask = $state<string>('');
	let newTaskCount = $state<number>(1);
	let newAward = $state<string>('');

	function addTask() {
		if (!newTask.trim() || !newAward.trim()) return;
		todos.push({
			id: todos.length + 1,
			task: newTask,
			award: newAward,
			completed: false,
			targetCount: newTaskCount,
			currentCount: 0,
			percentage: 0,
			showCompletionAnimation: false
		});
		newTask = '';
		newAward = '';
		newTaskCount = 1;
	}

	function incrementProgress(todo: TodoItem) {
		if (todo.currentCount < todo.targetCount) {
			todo.currentCount++;
			todo.percentage = Math.round((todo.currentCount / todo.targetCount) * 100);

			if (todo.percentage === 100) {
				todo.showCompletionAnimation = true;
				todo.completed = true;
				setTimeout(() => {
					todo.showCompletionAnimation = false;
				}, 1500);
			}
		}
	}

	function handleKeyPress(event: KeyboardEvent) {
		if (event.key === 'Enter') addTask();
	}
</script>

<main class="min-h-screen bg-gradient-to-br from-amber-100 to-violet-50 p-8">
	<div class="mx-auto max-w-2xl rounded-xl bg-slate-50 p-8 shadow-2xl">
		<h1 class="mb-8 bg-clip-text text-center text-4xl font-bold text-transparent text-zinc-900">
			獎勵大挑戰
		</h1>

		<div class="mb-8 flex gap-4">
			<div class="flex-1 space-y-2">
				<input
					type="text"
					bind:value={newTask}
					placeholder="凱媞待辦事項！"
					class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
					onkeypress={handleKeyPress}
				/>
				<input
					type="text"
					bind:value={newAward}
					placeholder="媞想要的獎勵"
					class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
					onkeypress={handleKeyPress}
				/>
			</div>
			<div class="flex items-center gap-2">
				<button class="countButton" onclick={() => (newTaskCount = Math.max(1, newTaskCount - 1))}>
					-
				</button>
				<span class="w-12 text-center font-medium">{newTaskCount}</span>
				<button class="countButton" onclick={() => (newTaskCount = newTaskCount + 1)}> + </button>
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
				<div
					class="flex items-center gap-4 rounded-lg bg-gray-50 p-4 transition-shadow duration-200 hover:shadow-md"
					in:fly={{ y: 20 }}
					out:slide
				>
					<!-- The left side content starts here todo or award -->
					{#if todo.completed}
						<p class="flex-1 text-lg font-medium text-emerald-500">🏆 {todo.award}</p>
					{:else}
						<p class="flex-1 text-lg">{todo.task}</p>
					{/if}
					<!-- The left side content ends here todo or award -->

					<!-- The progress star count starts here -->
					<div class="mr-2 flex gap-1">
						{#each Array(todo.targetCount) as _, i}
							{#if i < todo.currentCount}
								<span class="text-xl">⭐️</span>
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
							disabled={todo.completed}
						>
							+
						</button>
						<span class="w-16 text-center font-medium">
							{todo.currentCount}/{todo.targetCount}
						</span>
					</div>
					<!-- The progress button ends here -->

					<!-- The delete button starts here -->
					<button
						class="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500 text-white transition-colors duration-200 hover:bg-red-600"
						onclick={() => (todos = todos.filter((t) => t !== todo))}
					>
						×
					</button>
					<!-- The delete button ends here -->

					{#if todo.showCompletionAnimation}
						<div
							class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
							transition:fade={{ duration: 500 }}
						>
							<div
								class="rounded-xl bg-white p-8 shadow-2xl"
								transition:fly={{ y: 200, duration: 500 }}
							>
								<h2 class="mb-4 text-center text-3xl font-bold text-emerald-500">
									🎉 妳完成了！ 🎉
								</h2>
								<p class="mb-4 text-center text-xl text-gray-600">
									恭喜完成 "{todo.task}"！
								</p>
								<p class="text-center text-2xl font-bold text-emerald-500">
									可以跟齊索取: {todo.award} 🏆
								</p>
							</div>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</main>
