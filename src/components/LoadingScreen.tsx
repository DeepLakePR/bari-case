"use client";

import { Flex, Skeleton } from "antd";

type LoadingScreenProps = {
    label?: string;
};

export default function LoadingScreen({ label = "Carregando" }: LoadingScreenProps) {
    return (
        <main className="mx-auto flex max-w-[100rem] flex-col rounded-lg bg-white p-8 text-center md:text-left">
            <div className="rounded-t-xl py-4 pt-0">
                <Skeleton.Input active size="default" style={{ width: 220, height: 28 }} className="mb-4" />

                <Flex className="flex flex-col md:flex-row md:justify-between items-center gap-4 w-full">
                    <div className="flex flex-col md:flex-row gap-4 w-full">
                        <Skeleton.Input active size="default" classNames={{ content: 'w-full! md:w-[200px]' }} />
                        <Skeleton.Input active size="default" classNames={{ content: 'w-full! md:w-[200px]' }} />
                        <Skeleton.Input active size="default" classNames={{ content: 'w-full! md:w-[200px]' }} />
                    </div>

                    <Skeleton.Button active size="default" className="w-full! md:w-[160px]!" classNames={{ content: 'w-full!' }} />
                </Flex>
            </div>

            <div className="rounded-b-xl py-4 pt-0">
                <Skeleton
                    active
                    title={false}
                    paragraph={{
                        rows: 6,
                        width: ["100%", "100%", "100%", "100%", "100%", "100%"],
                    }}
                />
            </div>

            <span className="sr-only" aria-live="polite">
                {label}
            </span>
        </main>
    );
}
