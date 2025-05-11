import { test, expect, Page } from '@playwright/test';

type Todo = {
  title: string;
  priority: string;
};

// See here how to get started:
// https://playwright.dev/docs/intro
test('visits the app root url', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('p')).toHaveText('No todos available. Click on Add Todo button to add new todo item');
})

const addTodo=async(page:Page, {title='test-todo', priority='Optional'}:Todo)=>{
 //Add new todo item 
  //Fill the input field with a todo item
  await page.locator('input').fill(title);
  //Fill the select field with a todo item
  await page.locator('select').selectOption(priority);
  //Click on the add todo button
  await page.getByRole('button', { name: 'Add Todo' }).click();

  //Verify success message
  await expect(page.locator('p')).toHaveText('Todo added successfully');
  
  await page.waitForTimeout(1000); //wait for 1000ms  
}

test('visits the add todo page', async ({ page }) => {
  await page.goto('/');
  // Click on the add todo button
  await page.getByRole('button', { name: 'Add Todo' }).click();
  //Verify that the add todo page is loaded
  await expect(page).toHaveURL(/.*add-todo/);
  //Verify that the add todo page has the correct title
  await expect(page.locator('input')).toHaveAttribute('placeholder', 'Enter title');
  await expect(page.locator('input')).toHaveAttribute('type', 'text');

   //Verify that the add todo button is visible
  await expect(page.getByRole('button', { name: 'Add Todo' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Add Todo' })).toHaveText('Add Todo');
   //Verify that the back button is visible
  await expect(page.getByRole('button', { name: 'Back' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Back' })).toHaveText('Back');

  // add new todo item
  await addTodo(page, {title:'Test Todo', priority:'Critical'});
  await page.waitForTimeout(1000); //wait for 1000ms 

  //Verify that the todo item is added to the todo todo list page
  await expect(page.getByText('Critical (1)')).toBeVisible();
  await expect(page.getByText('Title: Test Todo')).toBeVisible();
  await expect(page.getByText('Priority: Critical')).toBeVisible();

});

test('should edit todo and updated on todo list page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Add Todo' }).click();
    //Verify that the add todo page is loaded
    await expect(page).toHaveURL(/.*add-todo/);
    
    //Add new todo item
    await addTodo(page, {title:'Test Todo', priority:'Moderate'});
   
    //Click on the edit button
    await page.getByTestId('edit-todo').click();
    //Verify that the add todo page is loaded
    await expect(page).toHaveURL(/.*edit-todo/);

    //Fill the input field with a todo item
    await page.locator('input').fill('Test Todo Edited');
    //Fill the select field with a todo item
    await page.locator('select').selectOption('Optional');
    //Click on the edit todo button
    await page.getByRole('button', { name: 'Update Todo' }).click();
  
    //Verify success message
    await expect(page.locator('p')).toHaveText('Updated todo item successfully');
    await page.waitForTimeout(1000); //wait for 1000ms 

    //Verify that the todo item is edited to the todo todo list page
    await expect(page.getByText('Optional (1)')).toBeVisible();
    await expect(page.getByText('Test Todo Edited')).toBeVisible();
    await expect(page.getByText('Priority: Optional')).toBeVisible();
});

test('should delete todo item', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Add Todo' }).click();
  //Verify that the add todo page is loaded
  await expect(page).toHaveURL(/.*add-todo/);
  
  //Add new todo item
  await addTodo(page, {title:'Test Todo', priority:'Critical'});

  //Click on the delete button
  await page.getByTestId('delete-todo').click();

  //Verify that the todo item is deleted to the todo todo list page
  await expect(page.locator('p')).toHaveText('No todos available. Click on Add Todo button to add new todo item');
  await expect(page.getByText('No todos available. Click on Add Todo button to add new todo item')).toBeVisible();
});

test('should delete all todo item on click Clear All button', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Add Todo' }).click();
  //Verify that the add todo page is loaded
  await expect(page).toHaveURL(/.*add-todo/);
  
  //Add new todo item
  await addTodo(page, {title:'My Todo', priority:'Critical'});

  //Click on the delete button
  await page.getByRole('button', { name: 'Clear All' }).click();

  //Verify that the todo item is deleted to the todo todo list page
  await expect(page.locator('p')).toHaveText('No todos available. Click on Add Todo button to add new todo item');
  await expect(page.getByText('No todos available. Click on Add Todo button to add new todo item')).toBeVisible();
});
