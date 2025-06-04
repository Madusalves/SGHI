'use client';
import Cleave from 'cleave.js/react';
import styles from './register.module.css'
export default function Register() {
    return (
        <div className={styles.container}>
            <form>
                <label htmlFor="name">
                    <p className={styles.lb}>Nome</p>
                    <input type="text" id="name" />
                </label>
                <div className={styles.shortinputs}> 
                    <label htmlFor="birthdate">
                        <p className={styles.lb}>Data de nascimento</p>
                        <input type="date" id="birthdate" />
                    </label>

                    <label htmlFor="sex">
                        <p className={styles.lb} id={styles.pdif2}>Sexo</p>
                        <select id="sex">
                            <option value="m">Masculino</option>
                            <option value="f">Feminino</option>
                        </select>
                    </label>
                </div>
                <div className={styles.shortinputs}> 
                    <label htmlFor="ctinfo">
                        <p className={styles.lb}>Contato</p>
                        <Cleave
                            id="ctinfo"
                            options={{
                                delimiters: ['(', ') ', '-', ''],
                                blocks: [0, 2, 5, 4],
                                numericOnly: true
                            }}
                            placeholder="(99) 99999-9999"
                            className="input"
                        />
                    </label>
                    <label htmlFor="healthcareplan" >
                        <p className={styles.lb} id={styles.pdif}>Convênio</p>
                        <select id="healthcareplan">
                            <option value="test">Add depois</option>
                        </select>
                    </label>
                </div>
                <label htmlFor="adress">
                    <p className={styles.lb}>Endereço</p>
                    <input type="text" id="adress" />
                </label>
                <div id={styles.btn}>
                    <button id={styles.update}>Atualizar informações</button>
                </div>
                
            </form>
        </div>
    );
}
