// The Midnight Spellbook - JavaScript functionality

class MidnightSpellbook {
    constructor() {
        this.spells = [
            {
                id: 1,
                name: "Reach into the Abyss",
                description: "Search the vast, unseen web for knowledge and secrets.",
                invocation: "Search the web for...",
                type: "search"
            },
            {
                id: 2,
                name: "Divination",
                description: "Distill the essence of lengthy texts into concise summaries.",
                invocation: "Summarize the following text:\\n\\n",
                type: "summarize"
            },
            {
                id: 3,
                name: "Conjuration",
                description: "Shape the ether with your words to craft the perfect prompt.",
                invocation: "Respond to the following prompt:\\n\\n",
                type: "prompt"
            },
            {
                id: 4,
                name: "Alchemist's Touch",
                description: "Transmute ideas into stunning visual art and imagery.",
                invocation: "Create a photorealistic image of a wise owl reading a glowing book in a mystical library",
                type: "image"
            },
            {
                id: 5,
                name: "Scribe's Insight",
                description: "Automate the creation of code, from simple scripts to complex functions.",
                invocation: "Write a Python function to calculate the factorial of a number.",
                type: "code"
            },
            {
                id: 6,
                name: "Bard's Muse",
                description: "Summon creative inspiration for stories, poems, and lyrics.",
                invocation: "Write a short poem about the moon.",
                type: "creative_writing"
            },
            {
                id: 7,
                name: "Taskmaster's Sigil",
                description: "Organize chaos by breaking down large goals into manageable tasks.",
                invocation: "Break down the goal of 'launching a new personal blog'.",
                type: "task_management"
            },
            {
                id: 8,
                name: "Echoes of the Past",
                description: "Recall and analyze historical data to find patterns and trends.",
                invocation: "Analyze the following data for trends:\\n\\n",
                type: "data_analysis"
            },
            {
                id: 9,
                name: "Translator's Charm",
                description: "Break language barriers by translating text between tongues.",
                invocation: "Translate 'Hello, world!' to French.",
                type: "translation"
            },
            {
                id: 10,
                name: "Oracle's Vision",
                description: "Forecast future possibilities based on current data and trends.",
                invocation: "Based on current trends in renewable energy, forecast the market in 5 years.",
                type: "forecasting"
            }
        ];
        
        this.selectedSpell = null;
        this.nextSpellId = 11;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.renderSpellGrid();
        this.setupTabSwitching();
    }
    
    setupEventListeners() {
        // Invoke spell button
        document.getElementById('invokeBtn').addEventListener('click', () => {
            this.invokeSpell();
        });
        
        // New spell form
        document.getElementById('spellForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.createNewSpell();
        });
    }
    
    setupTabSwitching() {
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabPanes = document.querySelectorAll('.tab-pane');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.dataset.tab;
                
                // Remove active class from all buttons and panes
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanes.forEach(pane => pane.classList.remove('active'));
                
                // Add active class to clicked button and corresponding pane
                button.classList.add('active');
                document.getElementById(targetTab).classList.add('active');
            });
        });
    }
    
    renderSpellGrid() {
        const spellGrid = document.getElementById('spellGrid');
        spellGrid.innerHTML = '';
        
        this.spells.forEach(spell => {
            const spellCard = document.createElement('div');
            spellCard.className = 'spell-card';
            spellCard.dataset.spellId = spell.id;
            
            spellCard.innerHTML = `
                <h3 class="spell-card__name">${spell.name}</h3>
                <p class="spell-card__description">${spell.description}</p>
            `;
            
            spellCard.addEventListener('click', () => {
                this.selectSpell(spell);
            });
            
            spellGrid.appendChild(spellCard);
        });
    }
    
    selectSpell(spell) {
        this.selectedSpell = spell;
        
        // Update selected spell UI
        document.getElementById('selectedSpell').classList.add('hidden');
        document.getElementById('spellInvocation').classList.remove('hidden');
        
        // Update spell details
        document.getElementById('spellName').textContent = spell.name;
        document.getElementById('spellDescription').textContent = spell.description;
        document.getElementById('promptText').value = spell.invocation;
        
        // Update selected state in grid
        document.querySelectorAll('.spell-card').forEach(card => {
            card.classList.remove('selected');
        });
        document.querySelector(`[data-spell-id="${spell.id}"]`).classList.add('selected');
        
        // Hide previous results
        document.getElementById('spellResults').classList.add('hidden');
    }
    
    async invokeSpell() {
        if (!this.selectedSpell) return;
        
        const invokeBtn = document.getElementById('invokeBtn');
        const btnText = invokeBtn.querySelector('.btn-text');
        const btnLoading = invokeBtn.querySelector('.btn-loading');
        const promptText = document.getElementById('promptText').value;
        
        // Show loading state
        btnText.classList.add('hidden');
        btnLoading.classList.remove('hidden');
        invokeBtn.disabled = true;
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Generate results based on spell type
        const results = this.generateMockResults(this.selectedSpell.type, promptText);
        
        // Show results
        document.getElementById('resultsContent').innerHTML = results;
        document.getElementById('spellResults').classList.remove('hidden');
        
        // Reset button state
        btnText.classList.remove('hidden');
        btnLoading.classList.add('hidden');
        invokeBtn.disabled = false;
    }
    
    generateMockResults(spellType, prompt) {
        switch (spellType) {
            case 'search':
                return `
                    <div class="results-content">
                        <h5 style="color: #48d1cc; margin-bottom: 12px;">Search Results from the Abyss:</h5>
                        <ul class="results-list">
                            <li><strong>Ancient Wisdom Repository:</strong> Found 3 relevant sources of arcane knowledge</li>
                            <li><strong>Mystical Database:</strong> 7 scholarly articles on your query discovered</li>
                            <li><strong>Digital Grimoire:</strong> 12 related spells and incantations located</li>
                        </ul>
                    </div>
                `;
                
            case 'summarize':
                return `
                    <div class="results-content">
                        <h5 style="color: #48d1cc; margin-bottom: 12px;">Essence Distilled:</h5>
                        <p>The mystical energies have condensed your text into its core essence. The primary themes revolve around transformation, knowledge acquisition, and the bridging of realms between the known and unknown.</p>
                        <p><em>Key insights extracted from the ethereal plane...</em></p>
                    </div>
                `;
                
            case 'image':
                return `
                    <div class="results-content">
                        <h5 style="color: #48d1cc; margin-bottom: 12px;">Visual Manifestation:</h5>
                        <div style="background: linear-gradient(135deg, #1e293b 0%, #334155 100%); border: 2px solid #48d1cc; border-radius: 8px; padding: 40px; text-align: center; margin: 16px 0;">
                            <div style="font-size: 48px; margin-bottom: 16px;">🦉</div>
                            <p style="color: #cbd5e1; font-style: italic;">A wise owl materializes before you, its luminous eyes reflecting ancient knowledge as it reads from a glowing tome in a mystical library filled with floating books and ethereal light.</p>
                        </div>
                        <p><em>The alchemical process has transmuted your words into visual reality...</em></p>
                    </div>
                `;
                
            case 'code':
                return `
                    <div class="results-content">
                        <h5 style="color: #48d1cc; margin-bottom: 12px;">Scribe's Manifestation:</h5>
                        <div class="results-code">def factorial(n):
    """Calculate factorial of a number using recursion."""
    if n == 0 or n == 1:
        return 1
    else:
        return n * factorial(n - 1)

# Example usage
result = factorial(5)
print(f"5! = {result}")  # Output: 5! = 120</div>
                        <p><em>The ancient scribes have inscribed your solution in the eternal codex...</em></p>
                    </div>
                `;
                
            case 'creative_writing':
                return `
                    <div class="results-content">
                        <h5 style="color: #48d1cc; margin-bottom: 12px;">Bard's Inspiration:</h5>
                        <div style="background: rgba(15, 23, 42, 0.8); border-left: 4px solid #48d1cc; padding: 16px; margin: 16px 0; font-style: italic;">
                            <p>Silver sentinel in the star-kissed night,<br>
                            Your gentle glow ignites the dreams below,<br>
                            A beacon for the lost souls seeking light,<br>
                            Through shadowed paths where mystic secrets grow.</p>
                        </div>
                        <p><em>The muses have whispered their verses through the cosmic winds...</em></p>
                    </div>
                `;
                
            case 'task_management':
                return `
                    <div class="results-content">
                        <h5 style="color: #48d1cc; margin-bottom: 12px;">Taskmaster's Divine Order:</h5>
                        <ul class="results-list">
                            <li><strong>Phase 1:</strong> Define your blog's purpose and target audience</li>
                            <li><strong>Phase 2:</strong> Choose a domain name and hosting platform</li>
                            <li><strong>Phase 3:</strong> Design your blog layout and branding</li>
                            <li><strong>Phase 4:</strong> Create initial content and posting schedule</li>
                            <li><strong>Phase 5:</strong> Set up analytics and social media integration</li>
                            <li><strong>Phase 6:</strong> Launch and promote your blog</li>
                        </ul>
                        <p><em>The cosmic forces have aligned your path to success...</em></p>
                    </div>
                `;
                
            case 'data_analysis':
                return `
                    <div class="results-content">
                        <h5 style="color: #48d1cc; margin-bottom: 12px;">Echoes Revealed:</h5>
                        <p><strong>Trend Analysis:</strong> The temporal patterns suggest a 23% increase in mystical energy during lunar phases.</p>
                        <p><strong>Correlation Discovery:</strong> Strong positive correlation (r=0.87) between spell effectiveness and caster's meditation time.</p>
                        <p><strong>Predictive Insight:</strong> The data whispers of a 15% surge in magical potency during the upcoming equinox.</p>
                        <p><em>The ancient data spirits have spoken their statistical truths...</em></p>
                    </div>
                `;
                
            case 'translation':
                return `
                    <div class="results-content">
                        <h5 style="color: #48d1cc; margin-bottom: 12px;">Linguistic Transmutation:</h5>
                        <div style="background: rgba(15, 23, 42, 0.8); border-radius: 8px; padding: 16px; margin: 16px 0;">
                            <p><strong>Original:</strong> Hello, world!</p>
                            <p><strong>French:</strong> Bonjour, monde!</p>
                            <p><strong>Mystical Translation:</strong> Salutations, realm of earthly existence!</p>
                        </div>
                        <p><em>The polyglot spirits have bridged the linguistic realms...</em></p>
                    </div>
                `;
                
            case 'forecasting':
                return `
                    <div class="results-content">
                        <h5 style="color: #48d1cc; margin-bottom: 12px;">Oracle's Prophecy:</h5>
                        <p><strong>5-Year Renewable Energy Forecast:</strong></p>
                        <ul class="results-list">
                            <li>Solar power capacity will increase by 180-220%</li>
                            <li>Wind energy installations will grow by 140-170%</li>
                            <li>Energy storage solutions will expand by 300-400%</li>
                            <li>Grid modernization will accelerate significantly</li>
                            <li>Investment flows will exceed $2.5 trillion globally</li>
                        </ul>
                        <p><em>The crystalline orb has revealed the threads of future possibility...</em></p>
                    </div>
                `;
                
            default:
                return `
                    <div class="results-content">
                        <h5 style="color: #48d1cc; margin-bottom: 12px;">Mystical Response:</h5>
                        <p>The ethereal energies have processed your invocation. The cosmic forces have aligned to bring forth wisdom from the void, transforming your words into actionable insights.</p>
                        <p><em>The spell has been cast, and the universe has responded...</em></p>
                    </div>
                `;
        }
    }
    
    createNewSpell() {
        const form = document.getElementById('spellForm');
        const formData = new FormData(form);
        
        const newSpell = {
            id: this.nextSpellId++,
            name: document.getElementById('newSpellName').value,
            description: document.getElementById('newSpellDescription').value,
            invocation: document.getElementById('newSpellInvocation').value,
            type: document.getElementById('newSpellType').value
        };
        
        // Add to spells array
        this.spells.push(newSpell);
        
        // Re-render spell grid
        this.renderSpellGrid();
        
        // Clear form
        form.reset();
        
        // Switch to grimoire tab and show success
        document.querySelector('[data-tab="grimoire"]').click();
        
        // Show success message (you could enhance this with a proper notification system)
        setTimeout(() => {
            alert('Spell has been successfully bound to your grimoire!');
        }, 300);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MidnightSpellbook();
});